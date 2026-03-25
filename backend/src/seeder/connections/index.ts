import { knex } from '../../postgres'

export const tableNameConnection = 'connections'

export const createTableConnection = async () => {
  if ( !await knex.schema.hasTable( tableNameConnection ) ) {
    await knex.schema.createTable( tableNameConnection, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'requester_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.uuid( 'addressee_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.string( 'status', 20 ).notNullable().defaultTo( 'pending' )
      table.timestamp( 'requested_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'responded_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    // Prevent self-connections and enforce bidirectional uniqueness
    await knex.raw( `
      ALTER TABLE connections
        ADD CONSTRAINT no_self_connect CHECK (requester_id <> addressee_id),
        ADD CONSTRAINT unique_connection UNIQUE (
          LEAST(requester_id::TEXT, addressee_id::TEXT),
          GREATEST(requester_id::TEXT, addressee_id::TEXT)
        )
    ` )
  }
}
