import { knex } from '../../postgres'

export const tableNameConnection = 'connections'

export const addSeedConnections = async () => {
  const count = await knex( tableNameConnection ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const [ alice, bob, carol, david, emma ] = await Promise.all( [
    knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
    knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
    knex( 'users' ).where( { email: 'carol@example.com' } ).first(),
    knex( 'users' ).where( { email: 'david@example.com' } ).first(),
    knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  ] )

  if ( !alice || !bob || !carol || !david || !emma ) return

  await knex( tableNameConnection ).insert( [
    { requester_id: alice.id, addressee_id: bob.id, status: 'accepted', responded_at: knex.fn.now() },
    { requester_id: alice.id, addressee_id: carol.id, status: 'accepted', responded_at: knex.fn.now() },
    { requester_id: bob.id, addressee_id: david.id, status: 'accepted', responded_at: knex.fn.now() },
    { requester_id: carol.id, addressee_id: emma.id, status: 'accepted', responded_at: knex.fn.now() },
    { requester_id: david.id, addressee_id: emma.id, status: 'pending' },
  ] )
}

export const createTableConnection = async () => {
  if ( ! await knex.schema.hasTable( tableNameConnection ) ) {
    await knex.schema.createTable( tableNameConnection, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'requester_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.uuid( 'addressee_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.string( 'status', 20 ).notNullable().defaultTo( 'pending' )
      table.timestamp( 'requested_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'responded_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    // Prevent self-connections and enforce bidirectional uniqueness
    await knex.raw(`
        ALTER TABLE connections
        ADD CONSTRAINT no_self_connect CHECK (requester_id <> addressee_id)
    `)

    await knex.raw(`
        ALTER TABLE connections
        ADD CONSTRAINT unique_connection UNIQUE (
        LEAST(requester_id::TEXT, addressee_id::TEXT),
        GREATEST(requester_id::TEXT, addressee_id::TEXT)
    )
`)
  }
}
