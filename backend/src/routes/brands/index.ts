import type { Request, Response } from 'express'
import { Router } from 'express'
import { Brand } from '../../business-objects/brand'
import { createUploader } from '../../utils'

const createCb = async ( req: Request, res: Response ) => {
  const { name, status } = req.body

  const logoUrl = req.file
    ? `/uploads/brand_logos/${ req.file.filename }` : null
  try {
    const brand = await Brand.create( {
      name,
      status,
      logoUrl,
    } )

    res
      .status( 201 )
      .json( brand )
  } catch ( e ) {
    console.error( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

const deleteCb = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )

  try {
    const deprecatedOrDeletedBrand = await Brand.deleteById( id )

    res.status( 200 ).json( deprecatedOrDeletedBrand )
  } catch ( err: any ) {
    console.error( err )
    res.status( 500 ).send( err.message )
  }
}

const updateCb = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )
  const updatedBrand = req.body

  try {
    const brand = await Brand.update( id, updatedBrand )

    res.status( 201 )
      .json( brand )
  } catch ( err: any ) {
    console.error( err )
    res.status( 500 ).send( err.message )
  }
}

const bulkDeleteCb = async ( req: Request, res: Response ) => {
  const { ids } = req.body

  if ( ! Array.isArray( ids ) || ids.length === 0 ) {
    return res.status( 400 ).send( 'NO IDs provided' )
  }

  try {
    const deletedAndDeprecatedBrands = await Brand.deleteMany( ids )
    res.status( 200 ).json( deletedAndDeprecatedBrands )
  } catch ( err: any ) {
    console.error( err )
    res.status( 500 ).send( err.message )
  }
}

const getAllCb = async ( req: Request, res: Response ) => {
  try {
    const items = await Brand.getAll()
    res.status( 200 ).json( items )
  } catch ( e ) {
    console.error( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

const getAllPageCb = async ( req: Request, res: Response ) => {
  const { paging } = req.body

  try {
    const items = await Brand.getPage( paging )
    res.send( items )

  } catch ( e ) {
    console.error( e )
    res.status( 500 ).send( 'An error occured' )

  }
}

const getById = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )
  try {
    const item = ( await Brand.build( id ) ).get()
    res.send( item )

  } catch ( e ) {
    console.log( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

export const brandRoutes = Router()
  .post( '/', getAllPageCb )
  .get( '/', getAllCb )
  .get( '/:id', getById )
  .post( '/create', createUploader( 'brand_logos' ).single( 'logoUrl' ), createCb )
  .put( '/:id', updateCb )
  .delete( '/bulk-delete', bulkDeleteCb )
  .delete( '/:id', deleteCb )
