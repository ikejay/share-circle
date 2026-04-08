import connectPgSimple from 'connect-pg-simple'
import cors from 'cors'
import express, { Request, Response } from 'express'
import session, { SessionOptions } from 'express-session'
import passport from 'passport'
import { InitIdentityProviders } from './identity-provider'
import { connectToPostgres, sessionsSchemaName } from './postgres'
import { appRoutes } from './routes'
import { ensureTableExists } from './seeder'
import { addDefaultCategories } from './seeder/categories'
import { addSeedUsers } from './seeder/users'
import { addSeedItems } from './seeder/items'

const docsCb = ( req: Request, res: Response ) => {
  res.json( {
    message: 'Share Circle API is running',
    version: '1.0.0',
    documentation: '/api/docs',
  } )
}

const resourceNotFoundCb = ( req: Request, res: Response ) => {
  res.status( 404 ).json( { error: 'Route not found' } )
}

const { PORT, NODE_ENV } = process.env

const port = PORT || 3000
const environment = NODE_ENV || 'development'

const onServerStartup = () => {
  console.log( `Server running in ${ environment } mode on port ${ port }` )
  console.log( `Health check: http://localhost:${ port }/api/health` )
}

export class Backend {
  private pgStore: any
  private sessionInitialized: boolean = false

  constructor() {
    this.setupBasicMiddleWare()
  }

  private _app = express()

  get app() {
    return this._app
  }

  async run() {
    console.log( 'Starting Server Initializations...' )

    console.log( 'Connecting To Postgres...' )
    await connectToPostgres()

    console.log( 'Initializing Session Middleware...' )
    await this.initializeSessionMiddleware()

    console.log( 'Initializing Routes...' )
    this.initializeRoutes()

    console.log( 'Running Seeders...' )
    await this.runSeeders()

    console.log( 'Server Initializations Complete...' )
    return  this.app.listen( port, onServerStartup )
  }

  private setupBasicMiddleWare() {
    const corsOptions = {
      origin: process.env.FRONTEND_URL || 'http://localhost:9000',
      credentials: true,
      methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
      allowedHeaders: [ 'Content-Type', 'Authorization', 'Cookie' ],
    }

    this._app
      .use( cors( corsOptions ) )
      .use( express.json() )
      .use( express.urlencoded( { extended: true } ) )
  }

  private async initializeSessionMiddleware() {
    const { pool } = await import('./postgres')

    const PgSession = connectPgSimple( session )
    this.pgStore = new PgSession( {
      pool: pool,
      tableName: 'sessions',
      schemaName: sessionsSchemaName,
      createTableIfMissing: true,
      ttl: 86400,
      pruneSessionInterval: 60,
    } )

    const sessionOptions: SessionOptions = {
      store: this.pgStore,
      secret: process.env.SESSION_SECRET || 'Rabbit',
      name: 'sessionId',
      saveUninitialized: false,
      resave: false,
      rolling: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    }

    this._app
      .use( session( sessionOptions ) )
      .use( passport.initialize() )
      .use( passport.session() )

    InitIdentityProviders()

    this.sessionInitialized = true
    console.log( 'Session Initialized' )
  }

  private initializeRoutes() {
    this._app
      .use( '/api', appRoutes )
      .get( '/', docsCb )
      .use( /(.*)/, resourceNotFoundCb )
  }

  private async runSeeders() {
    await ensureTableExists()
    await addDefaultCategories()
    await addSeedUsers()
    await addSeedItems()
  }
}
