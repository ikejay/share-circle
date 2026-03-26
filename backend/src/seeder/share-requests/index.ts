import { knex } from '../../postgres'
import { EnumShareRequestStatus, EnumShareRequestDirection } from '../../../types-and-enums/enums'

export const tableNameShareRequest = 'share_requests'

export const addSeedShareRequests = async () => {
  const count = await knex( tableNameShareRequest ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const [ alice, bob, carol, emma ] = await Promise.all( [
    knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
    knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
    knex( 'users' ).where( { email: 'carol@example.com' } ).first(),
    knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  ] )

  if ( !alice || !bob || !carol || !emma ) return

  const [ drill, tent, camera, mixer ] = await Promise.all( [
    knex( 'items' ).where( { owner_id: alice.id, name: 'DeWalt 20V Drill' } ).first(),
    knex( 'items' ).where( { owner_id: alice.id, name: '4-Person Camping Tent' } ).first(),
    knex( 'items' ).where( { owner_id: bob.id, name: 'Canon EOS Rebel T7' } ).first(),
    knex( 'items' ).where( { owner_id: alice.id, name: 'KitchenAid Stand Mixer' } ).first(),
  ] )

  if ( !drill || !tent || !camera || !mixer ) return

  await knex( tableNameShareRequest ).insert( [
    {
      item_id: drill.id,
      requester_id: bob.id,
      recipient_user_id: alice.id,
      direction: EnumShareRequestDirection.BORROW,
      status: EnumShareRequestStatus.ACCEPTED,
      message: 'Hey Alice, can I borrow your drill this weekend?',
      proposed_start_date: '2026-03-01',
      proposed_end_date: '2026-03-15',
      responded_at: knex.fn.now(),
    },
    {
      item_id: tent.id,
      requester_id: carol.id,
      recipient_user_id: alice.id,
      direction: EnumShareRequestDirection.BORROW,
      status: EnumShareRequestStatus.PENDING,
      message: 'Going camping next week — would love to borrow your tent!',
      proposed_start_date: '2026-04-01',
      proposed_end_date: '2026-04-07',
    },
    {
      item_id: camera.id,
      requester_id: emma.id,
      recipient_user_id: bob.id,
      direction: EnumShareRequestDirection.BORROW,
      status: EnumShareRequestStatus.ACCEPTED,
      message: 'I have a photoshoot next month, can I borrow your camera?',
      proposed_start_date: '2026-02-10',
      proposed_end_date: '2026-02-20',
      responded_at: knex.fn.now(),
    },
    {
      item_id: mixer.id,
      requester_id: alice.id,
      recipient_user_id: carol.id,
      direction: EnumShareRequestDirection.OFFER,
      status: EnumShareRequestStatus.DECLINED,
      message: 'Want to try my KitchenAid for your baking?',
      responded_at: knex.fn.now(),
    },
  ] )
}

export const createTableShareRequest = async () => {
  if ( !await knex.schema.hasTable( tableNameShareRequest ) ) {
    await knex.schema.createTable( tableNameShareRequest, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' )
      table.uuid( 'requester_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'recipient_user_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'recipient_guest_id' ).nullable().references( 'id' ).inTable( 'guest_users' )
      table.string( 'direction', 10 ).notNullable()
      table.string( 'status', 20 ).notNullable().defaultTo( EnumShareRequestStatus.PENDING )
      table.text( 'message' ).nullable()
      table.date( 'proposed_start_date' ).nullable()
      table.date( 'proposed_end_date' ).nullable()
      table.timestamp( 'responded_at', { useTz: true } ).nullable()
      table.timestamp( 'expires_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    await knex.raw( `
      ALTER TABLE share_requests
        ADD CONSTRAINT recipient_required CHECK (
          recipient_user_id IS NOT NULL OR recipient_guest_id IS NOT NULL
        ),
        ADD CONSTRAINT not_same_requester_recipient CHECK (
          requester_id IS DISTINCT FROM recipient_user_id
        )
    ` )
  }
}
