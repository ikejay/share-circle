import { snakeToCamelRecord } from '../../helpers/converters'
import { knex } from '../../postgres'
import { tableNameItem } from '../../seeder/items'
import { IItem, tNewItem } from '../../types'

export class Item {
  static async getById( id: string ): Promise<IItem> {
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameItem )
      .where( { id } )
      .whereNull( 'deleted_at' )
      .first()

    if ( ! record ) {
      throw new Error( `USER WITH ID=${ id } NOT FOUND` )
    }

    return snakeToCamelRecord( record ) as IItem
  }

  static async create( item: tNewItem ): Promise<IItem> {
    try {
      const [ { id } ] = await knex( tableNameItem ).insert( item, [ 'id' ] )

      return this.getById( id )

    } catch ( err: any ) {
      if ( err.code === '23505' ) {
        throw new Error( 'DUPLICATE_KEY_ERROR' )
      }

      throw err
    }
  }

  static async remove( id: number ): Promise<true> {
    await knex( tableNameItem )
      .update( { deleted_at: new Date() } )
      .where( { id } )

    return true
  }
}
