import { snakeToCamelRecord } from '../../helpers/converters'
import { knex } from '../../postgres'
import { tableNameUserContact } from '../../seeder/user-contacts'
import { IUserContact, tNewContact } from '../../types'
import { User } from '../user'

export class UserContact {
  static async getById( id: number ): Promise<IUserContact> {
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameUserContact )
      .where( { id } )
      .whereNull( 'deleted_at' )
      .first()

    if ( ! record ) {
      throw new Error( `USER CONTACT WITH ID=${ id } NOT FOUND` )
    }

    return snakeToCamelRecord( record ) as IUserContact
  }

  static async getByUserId( userId: number ): Promise<IUserContact[]> {
    const records = await knex
      .queryBuilder()
      .select()
      .from( tableNameUserContact )
      .where( { userId } )
      .whereNull( 'deleted_at' )

    return records.map( snakeToCamelRecord ) as IUserContact[]
  }


  static async create( contact: tNewContact ): Promise<IUserContact> {
    if ( await UserContact.userDoesNotExist( contact.userId ) ) {
      throw new Error( `ERROR in  UserContact.create(): USER WITH ID=${ contact.userId } NOT FOUND` )
    }

    const [ { id } ] = await knex( tableNameUserContact ).insert( contact, [ 'id' ] )

    return this.getById( id )
  }

  private static async userDoesNotExist( userId: number ) {
    const user = await User.getById( userId )

    return ! user
  }
}
