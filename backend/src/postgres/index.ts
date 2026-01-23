import type { Knex } from 'knex'
import knexC from 'knex'
import { camelToSnakeCase } from '../helpers/converters'


export let knex: Knex<any, unknown[]>

const connect = async ( config: any ) => {
  knex = knexC( {
    ...config,
    pool: {
      min: 0,
      max: 10,
    },
  } )
}

const DEFAULT_SCHEMA_NAME = 'shop_db'
export let schemaName = DEFAULT_SCHEMA_NAME

export const connectToPostgres = async ( _schemaName = DEFAULT_SCHEMA_NAME ): Promise<any> => {
  schemaName = _schemaName
  const { DB_HOST, DB_USER, DB_PASSWORD } = process.env

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

  await connect( postgresConnectionConfig )

  return knex.raw( `CREATE SCHEMA IF NOT EXISTS ${ schemaName }` )
}