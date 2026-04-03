import Bluebird from 'bluebird'
import { snakeToCamelRecord } from '../../helpers/converters'
import { knex } from '../../postgres'
import { tableNameSocialAccount } from '../../seeder/social-accounts'
import { tableNameUser } from '../../seeder/users'
import { IUser, tNewContact, tNewUser } from '../../types'
import { UserContact } from '../user-contact'

export class User {
  static async getById( id: number ): Promise<IUser> {
    if ( id > 2147483647 || id < 0 ) {
      throw new Error( 'ID OUT OF RANGE' )
    }
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .where( { id } )
      .whereNull( 'deleted_at' )
      .first()

    if ( ! record ) {
      throw new Error( `USER WITH ID=${ id } NOT FOUND` )
    }

    const contacts = await UserContact.getByUserId( id )

    return {
      ...snakeToCamelRecord( record ),
      contacts,
    } as IUser
  }

  static async getByContact( contact: tNewContact ): Promise<IUser | null> {
    const record = await UserContact.getByUserContact( contact )

    if ( ! record ) return null

    return this.getById( record.userId )
  }

  static async getBySocialAccount( provider: string, providerUid: string ): Promise<IUser | null> {
    const account = await knex
      .queryBuilder()
      .select( 'user_id' )
      .from( tableNameSocialAccount )
      .where( { provider, provider_uid: providerUid } )
      .first()

    if ( ! account ) return null

    return this.getById( account.user_id )
  }

  static async create( { contacts, ...user }: tNewUser ): Promise<IUser> {
    const [ { id } ] = await knex( tableNameUser ).insert( user, [ 'id' ] )

    await Bluebird.each( contacts, async ( contact: tNewContact ) => UserContact.create( { ...contact, userId: id } ) )

    return this.getById( id )
  }

  static async upsertSocialAccount( userId: number, provider: string, providerUid: string, accessToken?: string, refreshToken?: string ) {
    const existing = await knex( tableNameSocialAccount )
      .where( { provider, provider_uid: providerUid } )
      .first()

    if ( existing ) {
      await knex( tableNameSocialAccount )
        .where( { provider, provider_uid: providerUid } )
        .update( {
          access_token: accessToken ?? null,
          refresh_token: refreshToken ?? null,
          updated_at: knex.fn.now(),
        } )
    } else {
      await knex( tableNameSocialAccount ).insert( {
        user_id: userId,
        provider,
        provider_uid: providerUid,
        access_token: accessToken ?? null,
        refresh_token: refreshToken ?? null,
      } )
    }
  }

  static async updateLatestLoggedIn( id: number ) {
    await knex( tableNameUser ).where( { id } ).update( { last_login_at: knex.fn.now() } )
  }
}
