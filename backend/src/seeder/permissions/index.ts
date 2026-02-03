import Bluebird from 'bluebird'
import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'
import { IPermissionRecord } from '../../types'

const permissionList: Omit<IPermissionRecord, 'id'>[] = [
  {
    name: 'Manage Products',
    value: 'product.manage',
  },
  {
    name: 'Manage Brands',
    value: 'brand.manage',
  },
]

export const tableNamePermission = 'permissions'

export const createTablePermission = async () => {
  if ( ! await knex.schema.hasTable( tableNamePermission ) ) {
    await knex.schema.createTable( tableNamePermission, function ( table ) {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'name' ).notNullable()
      table.string( 'value' ).notNullable()
    } )

    await createTableIndex( tableNamePermission, [ 'name' ], true )
  }
}

export const addDefaultPermissions = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNamePermission ) && ( await knex.select().from( tableNamePermission ) ).length === 0

  if ( tableIsEmpty ) {
    return Bluebird.each( permissionList, async provider => {
      return knex
        .insert( provider )
        .into( tableNamePermission )
    } )
  }
}
