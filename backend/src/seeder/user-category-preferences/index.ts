import { knex } from '../../postgres'

export const tableNameUserCategoryPreference = 'user_category_preferences'

export const createTableUserCategoryPreference = async () => {
  if ( !await knex.schema.hasTable( tableNameUserCategoryPreference ) ) {
    await knex.schema.createTable( tableNameUserCategoryPreference, ( table ) => {
      table.uuid( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.uuid( 'category_id' ).notNullable().references( 'id' ).inTable( 'categories' ).onDelete( 'CASCADE' )
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.primary( [ 'user_id', 'category_id' ] )
    } )
  }
}
