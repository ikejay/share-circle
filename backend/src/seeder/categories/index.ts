import Bluebird from 'bluebird'
import { knex } from '../../postgres'

export const tableNameCategory = 'categories'

const defaultCategories = [
  { name: 'Power Tools', description: 'Drills, saws, and other powered tools', sort_order: 1 },
  { name: 'Hand Tools', description: 'Hammers, screwdrivers, wrenches, etc.', sort_order: 2 },
  { name: 'Books', description: 'Fiction, non-fiction, textbooks', sort_order: 3 },
  { name: 'Sports & Outdoor Gear', description: 'Camping, hiking, sporting equipment', sort_order: 4 },
  { name: 'Electronics', description: 'Cameras, gadgets, cables', sort_order: 5 },
  { name: 'Kitchen Appliances', description: 'Mixers, blenders, speciality cookware', sort_order: 6 },
  { name: 'Party Supplies', description: 'Decorations, tables, chairs', sort_order: 7 },
  { name: 'Clothing & Accessories', description: 'Seasonal or occasion wear', sort_order: 8 },
]

export const createTableCategory = async () => {
  if ( !await knex.schema.hasTable( tableNameCategory ) ) {
    await knex.schema.createTable( tableNameCategory, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.string( 'name', 100 ).unique().notNullable()
      table.text( 'description' ).nullable()
      table.text( 'icon_url' ).nullable()
      table.boolean( 'is_active' ).notNullable().defaultTo( true )
      table.integer( 'sort_order' ).notNullable().defaultTo( 0 )
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}

export const addDefaultCategories = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNameCategory ) &&
    ( await knex.select().from( tableNameCategory ) ).length === 0

  if ( tableIsEmpty ) {
    return Bluebird.each( defaultCategories, async ( category ) => {
      return knex.insert( category ).into( tableNameCategory )
    } )
  }
}
