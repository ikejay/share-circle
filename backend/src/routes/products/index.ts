import type { Request, Response } from 'express'
import { Router } from 'express'
import { Product } from '../../business-objects/product'

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

const getById = async ( req: Request, res: Response ) => {
  const id: number = parseInt( req.params.id as string )
  try {
    const item = await Product.getProductById( id )
    res.send( item )

  } catch ( e ) {
    console.log( e )
    res.status( 500 ).send( 'An error occured' )
  }
}

export const productRoutes = Router()
  .post( '/', getAllCb )
  .get( '/:id', getById )
