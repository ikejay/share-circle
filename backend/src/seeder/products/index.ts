import Bluebird from 'bluebird'
import { brands } from '../../dummy'
import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'

export const tableNameProduct = 'products'

export const createTableProduct = async () => {
  if ( ! await knex.schema.hasTable( tableNameProduct ) ) {
    await knex.schema.createTable( tableNameProduct, ( table ) => {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'product_code' ).notNullable()
      table.string( 'name' ).notNullable()
      table.integer( 'brand_id' ).notNullable()
      table.text( 'description' ).nullable()
      table.string( 'image_url', 2048 ).nullable().defaultTo( null )
      table.decimal( 'price', 10, 4 ).notNullable()
      table.integer( 'stock_quantity' ).defaultTo( 0 )
      table.string( 'status' ).notNullable()
    } )

    await createTableIndex( tableNameProduct, [ 'id' ], true )
    await createTableIndex( tableNameProduct, [ 'product_code' ], true )
  }
}


export const addDefaultProducts = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNameProduct ) && ( await knex.select().from( tableNameProduct ) ).length === 0

  if ( tableIsEmpty ) {
    Bluebird.each( brands, async brand => {
      return knex
        .insert( brand )
        .into( tableNameProduct )
    } )
  }
}