export const tableNameItemImage = 'item_images'

export const addSeedItemImages = async () => {
  // const count = await knex( tableNameItemImage ).count( 'id as c' ).first()
  // if ( Number( count?.c ) > 0 ) return
  //
  // const items = await knex( 'items' ).whereIn( 'name', [
  //   'DeWalt 20V Drill', '4-Person Camping Tent', 'Canon EOS Rebel T7',
  //   'KitchenAid Stand Mixer', 'Nintendo Switch',
  // ] )
  //
  // const byName = ( name: string ) => items.find( i => i.name === name )
  //
  // const images: { item_id: string; url: string; is_primary: boolean; sort_order: number }[] = []
  //
  // const drill = byName( 'DeWalt 20V Drill' )
  // if ( drill ) {
  //   images.push(
  //     { item_id: drill.id, url: 'https://placehold.co/800x600?text=DeWalt+Drill', is_primary: true, sort_order: 0 },
  //     { item_id: drill.id, url: 'https://placehold.co/800x600?text=DeWalt+Batteries', is_primary: false, sort_order: 1 },
  //   )
  // }
  //
  // const tent = byName( '4-Person Camping Tent' )
  // if ( tent ) {
  //   images.push( { item_id: tent.id, url: 'https://placehold.co/800x600?text=Coleman+Tent', is_primary: true, sort_order: 0 } )
  // }
  //
  // const camera = byName( 'Canon EOS Rebel T7' )
  // if ( camera ) {
  //   images.push(
  //     { item_id: camera.id, url: 'https://placehold.co/800x600?text=Canon+Camera', is_primary: true, sort_order: 0 },
  //     { item_id: camera.id, url: 'https://placehold.co/800x600?text=Canon+Lens', is_primary: false, sort_order: 1 },
  //   )
  // }
  //
  // const mixer = byName( 'KitchenAid Stand Mixer' )
  // if ( mixer ) {
  //   images.push( { item_id: mixer.id, url: 'https://placehold.co/800x600?text=KitchenAid+Mixer', is_primary: true, sort_order: 0 } )
  // }
  //
  // const nintendo = byName( 'Nintendo Switch' )
  // if ( nintendo ) {
  //   images.push( { item_id: nintendo.id, url: 'https://placehold.co/800x600?text=Nintendo+Switch', is_primary: true, sort_order: 0 } )
  // }
  //
  // if ( images.length > 0 ) await knex( tableNameItemImage ).insert( images )
}

export const createTableItemImage = async () => {
  // if ( !await knex.schema.hasTable( tableNameItemImage ) ) {
  //   await knex.schema.createTable( tableNameItemImage, ( table ) => {
  //     table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
  //     table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' ).onDelete( 'CASCADE' )
  //     table.text( 'url' ).notNullable()
  //     table.boolean( 'is_primary' ).notNullable().defaultTo( false )
  //     table.integer( 'sort_order' ).notNullable().defaultTo( 0 )
  //     table.timestamp( 'uploaded_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
  //   } )
  // }
}
