import {knex} from '../../postgres/index.js'
import {createTableIndex} from '../../postgres/create-unique-index.js'

export const tableNameProduct = 'products'

export const createTableProduct = async () => {
  if(!await knex.schema.hasTable(tableNameProduct)) {
    await knex.schema.createTable(tableNameProduct, (table) => {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'product_code' ).notNullable()
      table.string( 'name' ).notNullable()
      table.text( 'description' ).nullable()
      table.decimal( 'price', 10, 2 ).notNullable()
      table.decimal( 'cost_price', 10, 2 ).nullable()
      table.integer( 'stock_quantity' ).defaultTo( 0 )
      table.string( 'sku' ).notNullable()
      table.string( 'category' ).notNullable()
      table.string( 'brand' ).nullable()
      table.jsonb( 'attributes' ).nullable()
      table.string( 'status' ).notNullable()
      table.boolean( 'is_active' ).defaultTo( true )
    })

    await createTableIndex(tableNameProduct, ['id'], true)
    await createTableIndex(tableNameProduct, ['product_code'], true)
    await createTableIndex(tableNameProduct, ['sku'], true)
  }
}