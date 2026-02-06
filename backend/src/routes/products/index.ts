import type { Request, Response } from 'express'
import { Router } from 'express'
import { Product } from '../../business-objects/product'
import { IProductRecord } from '../../types'

const getAllCb = async ( req: Request, res: Response ) => {
  const { paging } = req.body

  try {
    const items = await Product.getPage( paging )
    res.send( items )

  } catch ( e ) {
    console.error( e )
    res.status( 500 ).send( 'An error occured' )

  }
}

const createCb = async ( req: Request, res: Response ) => {
  const payload: IProductRecord = req.body

  try {
    const product = await Product.create( payload )
    res.status( 201 )
      .json( product )
  } catch ( err ) {
    console.log( err )
    res.status( 500 ).send( 'An error occured' )
  }
}

const updateCb = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )
  const updatedProduct = req.body

  try {
    const product = await Product.update( id, updatedProduct )

    res.status( 201 )
      .json( product )
  } catch ( err: any ) {
    console.error( err )
    res.status( 500 ).send( err.message )
  }
}

const getById = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )
  try {
    const item = ( await Product.build( id ) ).get()
    res.send( item )

  } catch ( e ) {
    console.log( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

export const productRoutes = Router()
  .post( '/', getAllCb )
  .get( '/:id', getById )
  .post( '/create', createCb )
  .put( '/:id', updateCb )
