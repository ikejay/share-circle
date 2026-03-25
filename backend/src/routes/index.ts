import { Request, Response, Router } from 'express'
import { authRoutes } from './auth'

const healthCheck = ( req: Request, res: Response ) => {
  res.status( 200 ).json( {
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'share-circle-api',
  } )
}

export const appRoutes = Router()
  .get( '/health', healthCheck )
  .use( '/auth', authRoutes )
