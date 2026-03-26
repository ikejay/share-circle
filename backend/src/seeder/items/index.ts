import { knex } from '../../postgres'
import { EnumItemCondition, EnumItemVisibility } from '../../../types-and-enums/enums'

export const tableNameItem = 'items'

export const addSeedItems = async () => {
  const count = await knex( tableNameItem ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const [ alice, bob, carol, david, emma ] = await Promise.all( [
    knex( 'users' ).where( { email: 'alice@example.com' } ).first(),
    knex( 'users' ).where( { email: 'bob@example.com' } ).first(),
    knex( 'users' ).where( { email: 'carol@example.com' } ).first(),
    knex( 'users' ).where( { email: 'david@example.com' } ).first(),
    knex( 'users' ).where( { email: 'emma@example.com' } ).first(),
  ] )

  if ( !alice || !bob || !carol || !david || !emma ) return

  const categories = await knex( 'categories' ).select()
  const cat = ( name: string ) => categories.find( c => c.name === name )

  const powerTools = cat( 'Power Tools' )
  const handTools = cat( 'Hand Tools' )
  const books = cat( 'Books' )
  const sports = cat( 'Sports & Outdoor Gear' )
  const electronics = cat( 'Electronics' )
  const kitchen = cat( 'Kitchen Appliances' )
  const party = cat( 'Party Supplies' )
  const clothing = cat( 'Clothing & Accessories' )

  if ( !powerTools || !electronics ) return

  await knex( tableNameItem ).insert( [
    { owner_id: alice.id, category_id: powerTools.id, name: 'DeWalt 20V Drill', description: 'Cordless drill with two batteries and a charger', condition: EnumItemCondition.GOOD, is_available: false, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 120.00, notes: 'Please return with batteries charged.' },
    { owner_id: alice.id, category_id: sports!.id, name: '4-Person Camping Tent', description: 'Coleman dome tent, barely used', condition: EnumItemCondition.LIKE_NEW, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 80.00 },
    { owner_id: alice.id, category_id: kitchen!.id, name: 'KitchenAid Stand Mixer', description: 'Classic 5qt stand mixer in red', condition: EnumItemCondition.NEW, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 350.00 },
    { owner_id: bob.id, category_id: electronics.id, name: 'Canon EOS Rebel T7', description: 'DSLR camera with 18-55mm kit lens', condition: EnumItemCondition.GOOD, is_available: false, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 450.00 },
    { owner_id: bob.id, category_id: books!.id, name: 'The Great Gatsby', description: 'F. Scott Fitzgerald paperback edition', condition: EnumItemCondition.FAIR, is_available: true, visibility: EnumItemVisibility.CONNECTIONS },
    { owner_id: carol.id, category_id: sports!.id, name: 'Lululemon Yoga Mat', description: 'Extra-thick 6mm yoga mat in purple', condition: EnumItemCondition.GOOD, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 65.00 },
    { owner_id: carol.id, category_id: party!.id, name: 'Folding Table Set (6ft)', description: '2 folding tables with 8 chairs', condition: EnumItemCondition.GOOD, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 150.00 },
    { owner_id: david.id, category_id: powerTools.id, name: 'Makita Circular Saw 7-1/4"', description: 'Corded circular saw, excellent condition', condition: EnumItemCondition.LIKE_NEW, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 90.00 },
    { owner_id: david.id, category_id: handTools!.id, name: 'Craftsman Wrench Set (20pc)', description: 'SAE and metric combination wrenches', condition: EnumItemCondition.GOOD, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 45.00 },
    { owner_id: emma.id, category_id: electronics.id, name: 'Nintendo Switch', description: 'With dock, joy-cons, and 3 games', condition: EnumItemCondition.LIKE_NEW, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 280.00 },
    { owner_id: emma.id, category_id: clothing!.id, name: 'North Face Winter Jacket (M)', description: 'Warm down jacket, size Medium', condition: EnumItemCondition.GOOD, is_available: true, visibility: EnumItemVisibility.CONNECTIONS, estimated_value: 180.00 },
  ] )
}

export const createTableItem = async () => {
  if ( !await knex.schema.hasTable( tableNameItem ) ) {
    await knex.schema.createTable( tableNameItem, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'owner_id' ).notNullable().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' )
      table.uuid( 'category_id' ).notNullable().references( 'id' ).inTable( 'categories' )
      table.string( 'name', 200 ).notNullable()
      table.text( 'description' ).nullable()
      table.string( 'condition', 30 ).notNullable().defaultTo( EnumItemCondition.GOOD )
      table.boolean( 'is_available' ).notNullable().defaultTo( true )
      table.string( 'visibility', 20 ).notNullable().defaultTo( EnumItemVisibility.CONNECTIONS )
      table.decimal( 'estimated_value', 10, 2 ).nullable()
      table.text( 'notes' ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'deleted_at', { useTz: true } ).nullable()
    } )
  }
}
