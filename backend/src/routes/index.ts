import { Request, Response, Router } from 'express'

import { productRoutes } from './products'

export const appRoutes = Router()
  .use( '/products', productRoutes )
  .get( '/health', ( req: Request, res: Response ) => {
    res.status( 200 ).json( {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'base-shop-product-catalog-api',
    } )
  } )
