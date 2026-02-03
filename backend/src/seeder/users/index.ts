import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'

export const tableNameUser = 'users'

export const createTableUser = async () => {
  if ( ! await knex.schema.hasTable( tableNameUser ) ) {
    await knex.schema.createTable( tableNameUser, function ( table ) {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'account_id' ).notNullable()
      table.integer( 'identity_provider_id' ).notNullable()
      table.string( 'first_name' ).notNullable()
      table.string( 'last_name' ).notNullable()
      table.string( 'postal_address_id' ).nullable()
      table.string( 'email' ).notNullable()
      table.string( 'phone' ).nullable()
      table.boolean( 'is_admin' ).defaultTo( false )
      table.string( 'status' ).notNullable()
    } )

    await createTableIndex( tableNameUser, [ 'email' ], true )
  }
}
