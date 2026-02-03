import Bluebird from 'bluebird'
import { knex } from '../../postgres'
import { createTableIndex } from '../../postgres/create-unique-index'
import { IIdentityProvider } from '../../types'

const identityProviderList: IIdentityProvider[] = [
  { name: 'google' },
  { name: 'facebook' },
  { name: 'amazon' },
  { name: 'apple' },
]

export const tableNameIdentityProvider = 'identity_providers'

export const createTableIdentityProviders = async () => {
  if ( ! await knex.schema.hasTable( tableNameIdentityProvider ) ) {
    await knex.schema.createTable( tableNameIdentityProvider, function ( table ) {
      table.increments( 'id' ).primary()
      table.timestamps( true, true )

      table.string( 'name' ).notNullable()
    } )

    await createTableIndex( tableNameIdentityProvider, [ 'name' ], true )
  }
}

export const addDefaultIdentityProviders = async () => {
  const tableIsEmpty = await knex.schema.hasTable( tableNameIdentityProvider ) && ( await knex.select().from( tableNameIdentityProvider ) ).length === 0

  if ( tableIsEmpty ) {
    return Bluebird.each( identityProviderList, async provider => {
      return knex
        .insert( provider )
        .into( tableNameIdentityProvider )
    } )
  }
}
