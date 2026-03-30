import { knex } from '../../postgres'
import { tableNameItem } from '../items'
import { tableNameUser } from '../users'

export const tableNameSharing = 'sharings'

export const createTableSharing = async () => {
  if ( ! await knex.schema.hasTable( tableNameSharing ) ) {
    await knex.schema.createTable( tableNameSharing, ( table ) => {
      table.increments().primary()
      table.uuid( 'external_id' ).defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.integer( 'issuer_id', 255 ).references( 'id' ).inTable( tableNameUser )
      table.integer( 'recipient_id', 255 ).references( 'id' ).inTable( tableNameUser )
      table.integer( 'item_id', 255 ).references( 'id' ).inTable( tableNameItem )
      table.timestamp( 'issue_date', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'planned_return_date', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
      table.unique( [ 'item_id' ] )
    } )
  }
}

export const addSeedUsers = async () => {
  const count = await knex( tableNameSharing ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) {
    return
  }

  const [ alice, bob, carol, david, emma ] = await Promise.all( [
    knex( 'users' ).where( { id: 1 } ).first(),
    knex( 'users' ).where( { id: 2 } ).first(),
    knex( 'users' ).where( { id: 3 } ).first(),
    knex( 'users' ).where( { id: 4 } ).first(),
    knex( 'users' ).where( { id: 5 } ).first(),
  ] )

  if ( ! alice || ! bob || ! carol || ! david || ! emma ) return


  const [ drill, camera, mower ] = await Promise.all( [
    knex( 'items' ).where( { owner_id: alice.id, name: 'DeWalt 20V Drill' } ).first(),
    knex( 'items' ).where( { owner_id: bob.id, name: 'Canon EOS Rebel T7' } ).first(),
    knex( 'items' ).where( { owner_id: david.id, name: 'Lawn Mower Mitsubishi' } ).first(),
  ] )

  if ( ! drill || ! camera || mower ) return


  await knex( tableNameSharing ).insert( [
    {
      issuer_id: bob.id,
      recipient_id: alice.id,
      item_id: camera.id,
    },
    {
      issuer_id: alice.id,
      recipient_id: david.id,
      item_id: drill.id,
    },
    {
      issuer_id: david.id,
      recipient_id: carol.id,
      item_id: mower.id,
    },
  ] )
}
