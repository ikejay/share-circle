import { knex } from '../../postgres'

export const tableNameUser = 'users'

export const createTableUser = async () => {
  if ( !await knex.schema.hasTable( tableNameUser ) ) {
    await knex.schema.createTable( tableNameUser, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.string( 'email', 255 ).unique().notNullable()
      table.string( 'display_name', 100 ).notNullable()
      table.text( 'avatar_url' ).nullable()
      table.text( 'bio' ).nullable()
      table.string( 'phone', 30 ).nullable()
      table.boolean( 'is_email_verified' ).notNullable().defaultTo( false )
      table.string( 'status', 20 ).notNullable().defaultTo( 'active' )
      table.timestamp( 'last_login_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}
