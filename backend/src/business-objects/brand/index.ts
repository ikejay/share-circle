import { EnumBrandStatus, EnumProductStatus } from '../../../types-and-enums/enums'
import { logger } from '../../logger'
import { knex } from '../../postgres'
import { tableNameBrands } from '../../seeder/brands'
import { IBrand, IBrandResponse, IPaging } from '../../types'

export class Brand {
  constructor( protected readonly id: number ) {
  }

  static async create( brand: Omit<IBrand, 'id'> ): Promise<IBrand> {
    if ( brand.name.length === 0 ) {
      throw new Error( 'BRAND NAME IS EMPTY' )
    }

    brand.name = brand.name.trimEnd().trimStart()

    if ( brand.name.length > 35 ) {
      throw new Error( 'BRAND NAME IS TOO LONG' )
    }

    try {
      const [ { id } ] = await knex( tableNameBrands ).insert( brand, [ 'id' ] )

      return new Brand( id ).get()

    } catch ( err ) {
      logger( err )

      throw new Error( 'FAILED TO CREATE BRAND' )
    }
  }


  static async update( brandId: number, updatedData: Omit<IBrand, 'id'> ) {
    if ( ! updatedData ) {
      throw new Error( 'BRAND DETAILS ARE EMPTY' )
    }

    if ( updatedData.name.length === 0 ) {
      throw new Error( 'BRAND NAME IS EMPTY' )
    }

    updatedData.name = updatedData.name.trimEnd().trimStart()

    if ( updatedData.name.length > 35 ) {
      throw new Error( 'BRAND NAME IS TOO LONG' )
    }

    try {
      const [ { id } ] = await knex( tableNameBrands )
        .update( updatedData, [ 'id' ] )
        .where( { id: brandId } )

      return new Brand( id ).get()

    } catch ( err ) {
      logger( err )
    }
  }

  // TODO Implement delete logic of deprecation(Soft Delete)
  static async delete(){

  }

  static async getPage( paging: IPaging ): Promise<IBrandResponse> {
    const offset = ( paging.page - 1 ) * paging.itemsPerPage

    const list = await knex.queryBuilder()
      .select()
      .from( tableNameBrands )
      .orderBy( 'id' )
      .offset( offset )
      .limit( paging.itemsPerPage )

    const numberOfBrands = await knex( tableNameBrands )
      .count<{ count: number }[]>( '* as count' )
      .where( 'status', EnumProductStatus.ACTIVE )

    const totalCount = numberOfBrands[ 0 ].count

    return {
      list,
      totalCount,
      paging,
    }
  }

  static async getById( id: number ): Promise<IBrand> {
    const brand = await knex
      .queryBuilder()
      .select()
      .from( tableNameBrands )
      .where( 'id', id )
      .first()

    if ( ! brand ) {
      throw new Error( 'BRAND NOT FOUND' )
    }

    return brand
  }


  async get(): Promise<IBrand> {
    const records = await knex.queryBuilder().select().from( tableNameBrands ).where( { id: this.id } )

    if ( records.length === 0 ) {
      throw new Error( 'RECORD NOT FOUND' )
    }

    return records[ 0 ]
  }
}
