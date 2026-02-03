import { knex } from '../../postgres'
import { tableNameIdentityProvider } from '../../seeder/identity-providers'
import { IIdentityProviderRecord } from '../../types'

class Permission {
  static async getById( id: number ): Promise<IIdentityProviderRecord> {
    const record: IIdentityProviderRecord = await knex
      .queryBuilder()
      .select()
      .from( tableNameIdentityProvider )
      .where( { id } )
      .first()


    if ( ! record ) {
      throw new Error( `USER WITH ${ id } NOT FOUND` )
    }

    return record
  }


}