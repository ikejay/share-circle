import { logger } from '../../logger'
import { knex } from '../../postgres'
import { tableNameBrands } from '../../seeder/brands'
import { IBrand } from '../../types'

export class Brand {
  constructor( protected readonly id: number ) {
  }

  static async create( name: string ): Promise<IBrand> {
    if ( name.length === 0 ) {
      throw new Error( 'BRAND NAME IS EMPTY' )
    }

    name = name.trimEnd().trimStart()

    if ( name.length > 35 ) {
      throw new Error( 'BRAND NAME IS TOO LONG' )
    }

    try {
      const [ { id } ] = await knex( tableNameBrands ).insert( { name }, [ 'id' ] )

      return new Brand( id ).get()

    } catch ( err ) {
      logger( err )

      throw new Error( 'FAILED TO CREATE BRAND' )
    }
  }

  // TODO: what if "id" doesn't exist in db?
  static async getById( id: number ): Promise<IBrand> {
    const brands = await knex
      .queryBuilder()
      .select()
      .from( tableNameBrands )
      .where( 'id', id )

    if ( brands.length === 0 ) {
      throw new Error( 'BRAND NOT FOUND' )
    }

    return brands[ 0 ]
  }


  async get(): Promise<IBrand> {
    const records = await knex.queryBuilder().select().from( tableNameBrands ).where( { id: this.id } )

    if ( records.length === 0 ) {
      throw new Error( 'RECORD NOT FOUND' )
    }

    return records[ 0 ]
  }
}
