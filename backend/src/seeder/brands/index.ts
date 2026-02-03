import Bluebird from 'bluebird'
import { EnumBrandStatus } from '../../../types-and-enums/enums'
import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'
import { IBrand } from '../../types'

const brands: Omit<IBrand, 'id'>[] = [
  {
    name: 'GERMANCHEF',
    status: EnumBrandStatus.ACTIVE,
    logoUrl: null
  },
  {
    name: 'AKAI',
    status: EnumBrandStatus.ACTIVE,
    logoUrl: null
  },
  {
    name: 'MIELE',
    status: EnumBrandStatus.ACTIVE,
    logoUrl: null
  },
  {
    name: 'BRUHM',
    status: EnumBrandStatus.ACTIVE,
    logoUrl: null
  },
  {
    name: 'KLARSTEIN',
    status: EnumBrandStatus.ACTIVE,
    logoUrl: null
  },
]

export const tableNameBrands = 'brands'

export const createTableBrand = async () => {
  if ( ! await knex.schema.hasTable( tableNameBrands ) ) {
    await knex.schema.createTable( tableNameBrands, ( table ) => {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'name' ).notNullable()
      table.string( 'logo_url', 2048 ).nullable().defaultTo( null )
      table.string( 'status' ).nullable().defaultTo( EnumBrandStatus.INACTIVE )
    } )

    await createTableIndex( tableNameBrands, [ 'name' ], true )
  }
}

export const addDefaultBrands = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNameBrands ) && ( await knex.select().from( tableNameBrands ) ).length === 0

  if ( tableIsEmpty ) {
    return Bluebird.each( brands, async brand => {
      return knex
        .insert( brand )
        .into( tableNameBrands )
    } )
  }
}