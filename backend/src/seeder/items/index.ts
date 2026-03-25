import { knex } from '../../postgres'
import { EnumItemCondition, EnumItemVisibility } from '../../../../types-and-enums/enums'

export const tableNameItem = 'items'

export const createTableItem = async () => {
  if ( !await knex.schema.hasTable( tableNameItem ) ) {
    await knex.schema.createTable( tableNameItem, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'owner_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.uuid( 'category_id' ).notNullable().references( 'id' ).inTable( 'categories' )
      table.string( 'name', 200 ).notNullable()
      table.text( 'description' ).nullable()
      table.string( 'condition', 30 ).notNullable().defaultTo( EnumItemCondition.GOOD )
      table.boolean( 'is_available' ).notNullable().defaultTo( true )
      table.string( 'visibility', 20 ).notNullable().defaultTo( EnumItemVisibility.CONNECTIONS )
      table.decimal( 'estimated_value', 10, 2 ).nullable()
      table.text( 'notes' ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}
