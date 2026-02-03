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

// TODO Implement callback function for single and bulk delete(soft delete)
const deleteCb = () => {

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
    res.status( 500 ).send( 'An error occured' )
  }
}

const getAllCb = async ( req: Request, res: Response ) => {
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
    const item = await Brand.getById( id )
    res.send( item )

  } catch ( e ) {
    console.log( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

export const brandRoutes = Router()
  .post( '/', getAllCb )
  .get( '/:id', getById )
  .post( '/create', createUploader( 'brand_logos' ).single( 'logoUrl' ), createCb )
  .put( '/:id', updateCb )
