import { EnumUserStatus } from '../../../types-and-enums/enums'
import { knex } from '../../postgres'

export const tableNameUser = 'users'

export const createTableUser = async () => {
  if ( ! await knex.schema.hasTable( tableNameUser ) ) {
    await knex.schema.createTable( tableNameUser, ( table ) => {
      table.increments().primary()
      table.uuid( 'external_id' ).defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.string( 'display_name', 100 ).notNullable()
      table.text( 'avatar_url' ).nullable()
      table.string( 'status', 20 ).notNullable().defaultTo( EnumUserStatus.ACTIVE )
      table.timestamp( 'last_login_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}

export const addSeedUsers = async () => {
  const count = await knex( tableNameUser ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  await knex( tableNameUser ).insert( [
    {
      display_name: 'Alice Johnson',
    },
    {
      display_name: 'Bob Martinez',
    },
    {
      display_name: 'Carol Williams',
    },
    {
      display_name: 'David Chen',
    },
    {
      display_name: 'Emma Wilson',
    },
  ] )
}
