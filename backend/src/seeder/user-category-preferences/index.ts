export const tableNameUserCategoryPreference = 'user_category_preferences'

export const addSeedUserCategoryPreferences = async () => {
  // const count = await knex( tableNameUserCategoryPreference ).count( 'user_id as c' ).first()
  // if ( Number( count?.c ) > 0 ) return
  //
  // const [ alice, bob, carol, david, emma ] = await Promise.all( [
  //   knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
  //   knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
  //   knex( 'users' ).where( { email: 'carol@example.com' } ).first(),
  //   knex( 'users' ).where( { email: 'david@example.com' } ).first(),
  //   knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  // ] )
  //
  // if ( !alice || !bob || !carol || !david || !emma ) return
  //
  // const categories = await knex( 'categories' ).select()
  // const cat = ( name: string ) => categories.find( c => c.name === name )
  //
  // const prefs = [
  //   { user_id: alice.id, name: 'Power Tools' },
  //   { user_id: alice.id, name: 'Sports & Outdoor Gear' },
  //   { user_id: alice.id, name: 'Kitchen Appliances' },
  //   { user_id: bob.id, name: 'Electronics' },
  //   { user_id: bob.id, name: 'Books' },
  //   { user_id: carol.id, name: 'Sports & Outdoor Gear' },
  //   { user_id: carol.id, name: 'Party Supplies' },
  //   { user_id: david.id, name: 'Power Tools' },
  //   { user_id: david.id, name: 'Hand Tools' },
  //   { user_id: emma.id, name: 'Electronics' },
  //   { user_id: emma.id, name: 'Clothing & Accessories' },
  // ]
  //   .map( ( { user_id, name } ) => ( { user_id, category_id: cat( name )?.id } ) )
  //   .filter( ( p ) => p.category_id )
  //
  // if ( prefs.length > 0 ) await knex( tableNameUserCategoryPreference ).insert( prefs )
}

export const createTableUserCategoryPreference = async () => {
  // if ( !await knex.schema.hasTable( tableNameUserCategoryPreference ) ) {
  //   await knex.schema.createTable( tableNameUserCategoryPreference, ( table ) => {
  //     table.uuid( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
  //     table.uuid( 'category_id' ).notNullable().references( 'id' ).inTable( 'categories' ).onDelete( 'CASCADE' )
  //     table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
  //     table.primary( [ 'user_id', 'category_id' ] )
  //   } )
  // }
}
