import { knex } from '../../postgres'
import { EnumGuestUserStatus } from '../../../../types-and-enums/enums'

export const tableNameGuestUser = 'guest_users'

export const createTableGuestUser = async () => {
  if ( !await knex.schema.hasTable( tableNameGuestUser ) ) {
    await knex.schema.createTable( tableNameGuestUser, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.string( 'email', 255 ).unique().notNullable()
      table.string( 'name', 100 ).nullable()
      table.string( 'invite_token', 255 ).unique().notNullable()
      table.timestamp( 'token_expires_at', { useTz: true } ).notNullable()
      table.uuid( 'invited_by' ).notNullable().references( 'id' ).inTable( 'users' )
      table.string( 'status', 20 ).notNullable().defaultTo( EnumGuestUserStatus.INVITED )
      table.uuid( 'converted_user_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.timestamp( 'converted_at', { useTz: true } ).nullable()
      table.timestamp( 'last_email_sent_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}
