import { knex } from '../../postgres'
import { EnumShareTransactionStatus, EnumConditionOnReturn } from '../../../types-and-enums/enums'

export const tableNameShareTransaction = 'share_transactions'

export const addSeedShareTransactions = async () => {
  const count = await knex( tableNameShareTransaction ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const [ alice, bob, emma ] = await Promise.all( [
    knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
    knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
    knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  ] )

  if ( !alice || !bob || !emma ) return

  const [ drill, camera ] = await Promise.all( [
    knex( 'items' ).where( { owner_id: alice.id, name: 'DeWalt 20V Drill' } ).first(),
    knex( 'items' ).where( { owner_id: bob.id, name: 'Canon EOS Rebel T7' } ).first(),
  ] )

  if ( !drill || !camera ) return

  const [ drillRequest, cameraRequest ] = await Promise.all( [
    knex( 'share_requests' ).where( { item_id: drill.id, requester_id: bob.id, status: 'accepted' } ).first(),
    knex( 'share_requests' ).where( { item_id: camera.id, requester_id: emma.id, status: 'accepted' } ).first(),
  ] )

  const transactions = []

  if ( drillRequest ) {
    transactions.push( {
      request_id: drillRequest.id,
      item_id: drill.id,
      lender_id: alice.id,
      borrower_user_id: bob.id,
      status: EnumShareTransactionStatus.ACTIVE,
      start_date: '2026-03-01',
      expected_return_date: '2026-03-15',
      lender_notes: 'Please charge the batteries before returning.',
    } )
  }

  if ( cameraRequest ) {
    transactions.push( {
      request_id: cameraRequest.id,
      item_id: camera.id,
      lender_id: bob.id,
      borrower_user_id: emma.id,
      status: EnumShareTransactionStatus.COMPLETED,
      start_date: '2026-02-10',
      expected_return_date: '2026-02-20',
      actual_return_date: '2026-02-19',
      condition_on_return: EnumConditionOnReturn.AS_EXPECTED,
      borrower_notes: 'Returned a day early — great camera, thank you!',
    } )
  }

  if ( transactions.length > 0 ) await knex( tableNameShareTransaction ).insert( transactions )
}

export const createTableShareTransaction = async () => {
  if ( !await knex.schema.hasTable( tableNameShareTransaction ) ) {
    await knex.schema.createTable( tableNameShareTransaction, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'request_id' ).unique().notNullable().references( 'id' ).inTable( 'share_requests' )
      table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' )
      table.uuid( 'lender_id' ).notNullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'borrower_user_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'borrower_guest_id' ).nullable().references( 'id' ).inTable( 'guest_users' )
      table.string( 'status', 20 ).notNullable().defaultTo( EnumShareTransactionStatus.ACTIVE )
      table.date( 'start_date' ).notNullable()
      table.date( 'expected_return_date' ).notNullable()
      table.date( 'actual_return_date' ).nullable()
      table.text( 'lender_notes' ).nullable()
      table.text( 'borrower_notes' ).nullable()
      table.string( 'condition_on_return', 30 ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    await knex.raw( `
      ALTER TABLE share_transactions
        ADD CONSTRAINT borrower_required CHECK (
          borrower_user_id IS NOT NULL OR borrower_guest_id IS NOT NULL
        )
    ` )
  }
}
