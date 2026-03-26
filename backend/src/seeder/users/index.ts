import { knex } from '../../postgres'

export const tableNameUser = 'users'

export const addSeedUsers = async () => {
  const count = await knex( tableNameUser ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  await knex( tableNameUser ).insert( [
    { email: 'alice@example.com', display_name: 'Alice Johnson', bio: 'Love sharing tools and outdoor gear!', is_email_verified: true, status: 'active' },
    { email: 'bob@example.com', display_name: 'Bob Martinez', bio: 'Photographer and bookworm.', is_email_verified: true, status: 'active' },
    { email: 'carol@example.com', display_name: 'Carol Williams', bio: 'Fitness enthusiast and party planner.', is_email_verified: true, status: 'active' },
    { email: 'david@example.com', display_name: 'David Chen', bio: 'Weekend DIY warrior.', is_email_verified: true, status: 'active' },
    { email: 'emma@example.com', display_name: 'Emma Wilson', bio: 'Tech lover and fashionista.', is_email_verified: false, status: 'active' },
  ] )
}

export const createTableUser = async () => {
  if ( !await knex.schema.hasTable( tableNameUser ) ) {
    await knex.schema.createTable( tableNameUser, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.string( 'email', 255 ).unique().notNullable()
      table.string( 'display_name', 100 ).notNullable()
      table.text( 'avatar_url' ).nullable()
      table.text( 'bio' ).nullable()
      table.string( 'phone', 30 ).nullable()
      table.boolean( 'is_email_verified' ).notNullable().defaultTo( false )
      table.string( 'status', 20 ).notNullable().defaultTo( 'active' )
      table.timestamp( 'last_login_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}
