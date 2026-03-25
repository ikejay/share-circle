import type { Knex } from 'knex'
import knexC from 'knex'
import { Pool, PoolConfig } from 'pg'
import { camelToSnakeCase } from '../helpers/converters'


export let knex: Knex<any, unknown[]>

export let pool: Pool

const connect = async ( config: any ) => {
  knex = knexC( {
    ...config,
    pool: {
      min: 0,
      max: 10,
    },
  } )
}

const DEFAULT_SCHEMA_NAME = 'share_circle'
const SESSION_SCHEMA_NAME = 'user_sessions'

export let schemaName = DEFAULT_SCHEMA_NAME
export let sessionsSchemaName = SESSION_SCHEMA_NAME

export const connectToPostgres = async (
  _schemaName = DEFAULT_SCHEMA_NAME,
  _sessionsSchemaName = SESSION_SCHEMA_NAME,
): Promise<any> => {
  schemaName = _schemaName
  sessionsSchemaName = _sessionsSchemaName
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

  const postgresConnectionConfig = {
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      tableCatalog: schemaName,
    },
    debug: false,
    wrapIdentifier: ( val: string, origImpl: ( val: string ) => string ) => {
      if ( val === '*' ) {
        return origImpl( val )
      } else {
        return camelToSnakeCase( val )
      }
    },
    searchPath: [ schemaName ],
  }

  const poolConfig: PoolConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME || 'postgres',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  }


  pool = new Pool( poolConfig )

  await connect( postgresConnectionConfig )

  await knex.raw( `CREATE SCHEMA IF NOT EXISTS ${ schemaName }` )
  await knex.raw( `CREATE SCHEMA IF NOT EXISTS ${ sessionsSchemaName }` )

  return pool
}