import Bluebird from 'bluebird'
import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'
import { IUserPermissionRecord } from '../../types'

const adminDefaultPermissions: Omit<IUserPermissionRecord, 'id'>[] = [
  {
    userId: 1,
    permissionId: 1,
  },
  {
    userId: 1,
    permissionId: 2,
  },
]

export const tableNameUserPermission = 'user_permissions'

export const createTableUserPermission = async () => {
  if ( ! await knex.schema.hasTable( tableNameUserPermission ) ) {
    await knex.schema.createTable( tableNameUserPermission, function ( table ) {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.integer( 'user_id' ).notNullable()
      table.integer( 'permission_id' ).notNullable()
    } )

    await createTableIndex( tableNameUserPermission, [ 'user_id', 'permission_id' ], true )
  }
}

export const addDefaultAdminPermissions = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNameUserPermission ) && ( await knex.select().from( tableNameUserPermission ) ).length === 0

  if ( tableIsEmpty ) {
    return Bluebird.each( adminDefaultPermissions, async provider => {
      return knex
        .insert( provider )
        .into( tableNameUserPermission )
    } )
  }
}
