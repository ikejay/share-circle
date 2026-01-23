import { knex } from '../../postgres'
import { tableNameBrands } from '../../seeder/brands'
import { IBrand } from '../../types'

export class Brand {
  constructor( protected id: number ) {
  }

  static async create( name: string ): Promise<IBrand> {
    if ( name.length === 0 ) {
      throw new Error( 'BRAND NAME IS EMPTY' )
    }

    if ( name.length > 35 ) {
      throw new Error( 'BRAND NAME IS TOO LONG' )
    }


    try {
      name = name.trimEnd().trimStart()
      const [ { id } ] = await knex( tableNameBrands ).insert( { name }, [ 'id' ] )

      return new Brand( id ).get()

    } catch ( err ) {
      console.log( err )

      throw new Error( 'FAILED TO CREATE BRAND' )
    }
  }


  static async getById( id: number ): Promise<IBrand> {
    const brand = await knex
      .queryBuilder()
      .select()
      .from( tableNameBrands )
      .where( 'id', id )

    return brand[ 0 ]
  }


  async get(): Promise<IBrand> {
    const records = await knex.queryBuilder().select().from( tableNameBrands ).where( { id: this.id } )

    if ( records.length === 0 ) {
      throw new Error( 'FAILED TO CREATE BRAND' )
    }

    return records[ 0 ]
  }
}
