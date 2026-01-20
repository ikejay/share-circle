import knexC, { Knex } from 'knex'
import { types } from 'pg'
import { builtins } from 'pg-types'


export let knex: Knex<any, unknown[]>

types.setTypeParser( builtins.NUMERIC, ( val: any ) => {
  return val ? parseFloat( val ) : null
} )

types.setTypeParser( builtins.INT8, ( val ) => {
  return val ? parseInt( val ) : null
} )

types.setTypeParser( builtins.DATE, ( val ) => {
  return val
} )

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
    searchPath: [ schemaName ],
  }

  await connect( postgresConnectionConfig )

  return knex.raw( `CREATE SCHEMA IF NOT EXISTS ${ schemaName }` )
}