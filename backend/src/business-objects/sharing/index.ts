import { snakeToCamelRecord } from '../../helpers/converters'
import { knex } from '../../postgres'
import { tableNameSharing } from '../../seeder/sharings'
import { IItem, tNewItem, tNewSharing } from '../../types'

export class Sharing {
  static async getById( id: string ): Promise<IItem> {
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameSharing )
      .where( { id } )
      .whereNull( 'deleted_at' )
      .first()

    if ( ! record ) {
      throw new Error( `USER WITH ID=${ id } NOT FOUND` )
    }

    return snakeToCamelRecord( record ) as IItem
  }

  static async create( item: tNewSharing ): Promise<IItem> {
    try {
      const [ { id } ] = await knex( tableNameSharing ).insert( item, [ 'id' ] )

      return this.getById( id )

    } catch ( err: any ) {
      if ( err.code === '23505' ) {
        throw new Error( 'DUPLICATE_KEY_ERROR' )
      }

      throw err
    }
  }

  static async remove( id: number ): Promise<true> {
    await knex( tableNameSharing )
      .update( { deleted_at: new Date() } )
      .where( { id } )

    return true
  }
}
