import { knex } from '../../postgres'
import { tableNameUser } from '../../seeder/users'
import { tableNameSocialAccount } from '../../seeder/social-accounts'
import { IUser } from '../../types'

export class User {
  static async getById( id: string ): Promise<IUser> {
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .where( { id } )
      .whereNull( 'deleted_at' )
      .first()

    if ( !record ) {
      throw new Error( `USER WITH ID=${ id } NOT FOUND` )
    }

    return record
  }

  static async getByEmail( email: string ): Promise<IUser | null> {
    const record = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .where( { email } )
      .whereNull( 'deleted_at' )
      .first()

    return record ?? null
  }

  static async getBySocialAccount( provider: string, providerUid: string ): Promise<IUser | null> {
    const account = await knex
      .queryBuilder()
      .select( 'user_id' )
      .from( tableNameSocialAccount )
      .where( { provider, provider_uid: providerUid } )
      .first()

    if ( !account ) return null

    return this.getById( account.user_id )
  }

  static async create( userDetails: Pick<IUser, 'email' | 'displayName' | 'avatarUrl' | 'isEmailVerified' | 'status'> ): Promise<IUser> {
    const [ { id } ] = await knex( tableNameUser ).insert( {
      email: userDetails.email,
      display_name: userDetails.displayName,
      avatar_url: userDetails.avatarUrl,
      is_email_verified: userDetails.isEmailVerified,
      status: userDetails.status,
    }, [ 'id' ] )

    return this.getById( id )
  }

  static async upsertSocialAccount( userId: string, provider: string, providerUid: string, accessToken?: string, refreshToken?: string ) {
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

  static async touchLastLogin( id: string ) {
    await knex( tableNameUser ).where( { id } ).update( { last_login_at: knex.fn.now() } )
  }
}
