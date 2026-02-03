import { Request, Response, Router } from 'express'
import { authRoutes } from './auth'
import { brandRoutes } from './brands'

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
  .use( '/auth', authRoutes )
  .use( '/products', productRoutes )
  .use( '/brands', brandRoutes )
