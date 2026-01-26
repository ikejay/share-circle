import cors from 'cors'
import express, { Request, Response } from 'express'
import { connectToPostgres } from './postgres'
import { appRoutes } from './routes'
import { ensureTableExists } from './seeder'
import { addDefaultBrands } from './seeder/brands'
import { addDefaultProducts } from './seeder/products'

const docsCb = ( req: Request, res: Response ) => {
  res.json( {
    message: 'Base Shop Product Catalog API is running',
    version: '1.0.0',
    documentation: '/api/docs',
  } )
}

const resourceNotFoundCb = ( req: Request, res: Response ) => {
  res.status( 404 ).json( { error: 'Route not found' } )
}

export class Backend {
  constructor() {
    this._app
      .use( cors() )
      .use( express.json() )
      .use( express.urlencoded( { extended: true } ) )
      .use( '/api', appRoutes )
      .get( '/', docsCb )
      .use( /(.*)/, resourceNotFoundCb )
  }

  private _app = express()

  get app() {
    return this._app
  }

  async run() {
    console.log( 'Starting here==========' )
    await connectToPostgres()
    await ensureTableExists()
    await addDefaultBrands()
    await addDefaultProducts()
  }
}
