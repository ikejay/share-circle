import { Request, Response, Router } from 'express'

import { productRoutes } from './products'

const healthCheck = ( req: Request, res: Response ) => {
  res.status( 200 ).json( {
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'base-shop-product-catalog-api',
  } )
}


export const appRoutes = Router()
  .get( '/health', healthCheck )
  .use( '/products', productRoutes )
