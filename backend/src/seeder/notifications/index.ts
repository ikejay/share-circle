import { knex } from '../../postgres'

export const tableNameNotification = 'notifications'

export const addSeedNotifications = async () => {
  const count = await knex( tableNameNotification ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const [ alice, bob, carol, emma ] = await Promise.all( [
    knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
    knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
    knex( 'users' ).where( { email: 'carol@example.com' } ).first(),
    knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  ] )

  if ( !alice || !bob || !carol || !emma ) return

  await knex( tableNameNotification ).insert( [
    {
      user_id: alice.id,
      type: 'share_request_accepted',
      title: 'Bob accepted your share request',
      body: 'Bob Martinez accepted your offer of the DeWalt 20V Drill.',
      is_read: true,
      reference_type: 'share_request',
    },
    {
      user_id: bob.id,
      type: 'return_reminder',
      title: 'Return reminder: DeWalt 20V Drill',
      body: 'Your loan of the DeWalt 20V Drill from Alice Johnson is due on March 15.',
      is_read: false,
      reference_type: 'share_transaction',
    },
    {
      user_id: carol.id,
      type: 'share_request_declined',
      title: 'Share request declined',
      body: 'Alice Johnson declined your offer of the KitchenAid Stand Mixer.',
      is_read: false,
      reference_type: 'share_request',
    },
    {
      user_id: emma.id,
      type: 'share_request_accepted',
      title: 'Borrow request accepted',
      body: 'Bob Martinez accepted your request to borrow the Canon EOS Rebel T7.',
      is_read: true,
      reference_type: 'share_request',
    },
    {
      user_id: bob.id,
      type: 'connection_request',
      title: 'New connection request',
      body: 'David Chen wants to connect with you.',
      is_read: false,
      reference_type: 'connection',
    },
  ] )
}

export const createTableNotification = async () => {
  if ( !await knex.schema.hasTable( tableNameNotification ) ) {
    await knex.schema.createTable( tableNameNotification, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.string( 'type', 50 ).notNullable()
      table.string( 'title', 200 ).notNullable()
      table.text( 'body' ).nullable()
      table.boolean( 'is_read' ).notNullable().defaultTo( false )
      table.string( 'reference_type', 50 ).nullable()
      table.uuid( 'reference_id' ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}
