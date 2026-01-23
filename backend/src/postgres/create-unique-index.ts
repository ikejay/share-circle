import { v4 } from 'uuid'
import { knex } from './index'

export const createTableIndex = async ( tableName: string, fieldNames: string[], isUnique: boolean ) => {
  const indexName = `tab_${ v4().replace( /-/g, '_' ) }`

  if ( ! isUnique ) {
    return knex.schema.table( tableName, async ( tbl ) => {
      tbl.index( fieldNames, indexName )
    } )
  }

  return knex.raw( `CREATE UNIQUE INDEX ${ indexName + '_unique' } ON ${ tableName } (${ fieldNames }) NULLS NOT DISTINCT` )
}