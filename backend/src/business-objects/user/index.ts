import Bluebird from 'bluebird'
import { knex } from '../../postgres'
import { tableNameUser } from '../../seeder/users'
import { IRecordUser } from '../../types'


export class User {
  static async getById( id: number ): Promise<IRecordUser> {
    const records: IRecordUser[] = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .where( { id } )


    if ( records.length == 0 ) {
      throw new Error( `USER WITH ${ id } NOT FOUND` )
    }

    return records[ 0 ]
  }

  static async create( userDetails: Omit<IRecordUser, 'id'> ): Promise<IRecordUser> {
    if ( ! userDetails ) {
      throw new Error( 'USER DETAILS DO NOT EXIST' )
    }

    try {
      const [ { id } ] = await knex( tableNameUser ).insert( userDetails, [ 'id' ] )
      console.log( 'Id here', id )

      return User.getById( id )

    } catch ( err: any ) {

      throw new Error( 'FAILED TO CREATE PRODUCT' )

    }
  }

  static async getAll(): Promise<IRecordUser[]> {
    const users: IRecordUser[] = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .orderBy( 'id' )

    return Bluebird.mapSeries( users, async user => {
      return this.getById( user.id )
    } )
  }


  static async getAccountDetails( accountId: string ): Promise<Promise<IRecordUser> | null> {
    const records: IRecordUser[] = await knex
      .queryBuilder()
      .select()
      .from( tableNameUser )
      .where( { accountId } )

    if ( records.length === 0 ) {
      return null
    }

    return this.getById( records[ 0 ].id )
  }
}
