import cors from 'cors'
import express from 'express'
import { connectToPostgres } from './postgres'
import { appRoutes } from './routes'
import { ensureTableExists } from './seeder'
import { addDefaultBrands } from './seeder/brands'
import { addDefaultProducts } from './seeder/products'

export class Backend {
  constructor() {
    this._app.use( cors() )
    this._app.use( express.json() )
    this._app.use( express.urlencoded( { extended: true } ) )
    // this._app.use( logger )
    this._app
      .use( '/api', appRoutes )
      .get( '/', ( req, res ) => {
        res.json( {
          message: 'Base Shop Product Catalog API is running',
          version: '1.0.0',
          documentation: '/api/docs',
        } )
      } )
      .use( /(.*)/, ( req, res ) => {
        res.status( 404 ).json( { error: 'Route not found' } )
      } )
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
