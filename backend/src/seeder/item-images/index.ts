import { knex } from '../../postgres'

export const tableNameItemImage = 'item_images'

export const createTableItemImage = async () => {
  if ( !await knex.schema.hasTable( tableNameItemImage ) ) {
    await knex.schema.createTable( tableNameItemImage, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' ).onDelete( 'CASCADE' )
      table.text( 'url' ).notNullable()
      table.boolean( 'is_primary' ).notNullable().defaultTo( false )
      table.integer( 'sort_order' ).notNullable().defaultTo( 0 )
      table.timestamp( 'uploaded_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}
