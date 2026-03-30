import { EnumContactType } from '../../../types-and-enums/enums'
import { knex } from '../../postgres'
import { tableNameUser } from '../users'

export const tableNameUserContact = 'user_contacts'

export const createTableUserContact = async () => {
  if ( ! await knex.schema.hasTable( tableNameUserContact ) ) {
    await knex.schema.createTable( tableNameUserContact, ( table ) => {
      table.increments().primary()
      table.integer( 'user_id', 255 ).references( 'id' ).inTable( tableNameUser )
      table.string( 'type', 20 ).notNullable()
      table.string( 'value', 100 ).notNullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}

export const addSeedUsers = async () => {
  const count = await knex( tableNameUserContact ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  await knex( tableNameUserContact ).insert( [
    {
      user_id: 1,
      type: EnumContactType.EMAIL,
      value: 'alice@example.com',
    },
    {
      user_id: 21,
      type: EnumContactType.EMAIL,
      value: 'bob@example.com',
    },
    {
      user_id: 3,
      type: EnumContactType.EMAIL,
      value: 'carol@example.com',
    },
    {
      user_id: 4,
      type: EnumContactType.EMAIL,
      value: 'david@example.com',
    },
    {
      user_id: 5,
      type: EnumContactType.EMAIL,
      value: 'emma@example.com',
    },
  ] )
}
