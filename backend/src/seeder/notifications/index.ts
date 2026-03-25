import { knex } from '../../postgres'

export const tableNameNotification = 'notifications'

export const createTableNotification = async () => {
  if ( !await knex.schema.hasTable( tableNameNotification ) ) {
    await knex.schema.createTable( tableNameNotification, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.string( 'type', 50 ).notNullable()
      table.string( 'title', 200 ).notNullable()
      table.text( 'body' ).nullable()
      table.boolean( 'is_read' ).notNullable().defaultTo( false )
      table.string( 'reference_type', 50 ).nullable()
      table.uuid( 'reference_id' ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}
