import { knex } from '../../postgres'

export const tableNameSocialAccount = 'social_accounts'

export const createTableSocialAccount = async () => {
  if ( !await knex.schema.hasTable( tableNameSocialAccount ) ) {
    await knex.schema.createTable( tableNameSocialAccount, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.string( 'provider', 50 ).notNullable()
      table.string( 'provider_uid', 255 ).notNullable()
      table.text( 'access_token' ).nullable()
      table.text( 'refresh_token' ).nullable()
      table.timestamp( 'token_expires_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.unique( [ 'provider', 'provider_uid' ] )
    } )
  }
}
