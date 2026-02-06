import Bluebird from 'bluebird'
import { snakeToCamelRecord } from '../../helpers/converters'
import { logger } from '../../logger'
import { knex } from '../../postgres'
import { tableNameProduct } from '../../seeder/products'
import { IPaging, IProduct, IProductRecord, IProductResponse } from '../../types'
import { Brand } from '../brand'

const DOUBLICATE_KEY_ERROR = '23503'

export class Product {
  constructor( protected id: number ) {
  }

  static async build( id: number ) {
    await this.checkIfExists( id )

    return new Product( id )
  }

  static async create( product: Omit<IProductRecord, 'id'> ): Promise<IProduct> {
    if ( product.name.length === 0 ) {
      throw new Error( 'PRODUCT NAME IS EMPTY' )
    }

    if ( product.brandId === 0 ) {
      throw new Error( 'INVALID BRAND ID' )
    }

    const trimmedName = product.name = product.name.trim()

    if ( product.name.length > 35 ) {
      throw new Error( 'PRODUCT NAME IS TOO LONG' )
    }

    try {
      const [ { id } ] = await knex( tableNameProduct ).insert( { ...product, name: trimmedName }, [ 'id' ] )

      return new Product( id ).get()

    } catch ( err: any ) {
      if ( err.code === DOUBLICATE_KEY_ERROR ) {
        throw new Error( 'FAILED TO CREATE PRODUCT' )
      }

      throw err
    }
  }

  static async update( productId: number, updatedProduct: Omit<IProductRecord, 'id'> ) {
    if ( ! updatedProduct ) {
      throw new Error( 'PRODUCT DETAILS ARE EMPTY' )
    }

    if ( updatedProduct.name.length === 0 ) {
      throw new Error( 'PRODUCT NAME IS EMPTY' )
    }

    updatedProduct.name = updatedProduct.name.trimEnd().trimStart()

    if ( updatedProduct.name.length > 35 ) {
      throw new Error( 'PRODUCT NAME IS TOO LONG' )
    }

    try {
      const updatedRows = await knex( tableNameProduct )
        .where( { id: productId } )
        .update( updatedProduct )
        .returning( '*' )

      if ( ! updatedRows || updatedRows.length === 0 ) {
        throw new Error( 'PRODUCT NOT FOUND' )
      }

      const product = snakeToCamelRecord( updatedRows[ 0 ] )

      const brandId: number = product.brandId
      delete product.brandId

      return {
        ...product,
        brand: await ( await Brand.build( brandId ) ).get(),
      }

    } catch ( err ) {
      logger( err )
    }
  }

  static async getBrandIdsLinkedToProducts( ids: number[] ) {
    if ( ids.length === 0 ) {
      throw new Error( 'NO IDs HAVE BEEN PROVIDED' )
    }
    try {
      return await knex.queryBuilder()
        .select()
        .from( tableNameProduct )
        .whereIn( 'brand_id', ids )
        .distinct( 'brand_id' )
        .pluck( 'brand_id' )
    } catch ( err: any ) {
      throw err
    }
  }

  static async getPage( paging: IPaging ): Promise<IProductResponse> {
    const offset = ( paging.page - 1 ) * paging.itemsPerPage

    const records = await knex.queryBuilder()
      .select()
      .from( tableNameProduct )
      .orderBy( 'id' )
      .offset( offset )
      .limit( paging.itemsPerPage )

    const list = await Bluebird.mapSeries( records.map( snakeToCamelRecord ), async ( product: any ) => {

      const brandId = product.brandId
      delete product.brandId

      return {
        ...product,
        brand: await ( await Brand.build( brandId ) ).get(),
      }
    } ) as IProduct[]

    const numberOfProducts = await knex( tableNameProduct )
      .count<{ count: number }[]>( '* as count' )

    const totalCount = numberOfProducts[ 0 ].count

    return {
      list,
      totalCount,
      paging,
    }
  }

  protected static async checkIfExists( id: number ): Promise<void> {
    const records = await knex.queryBuilder()
      .select()
      .from( tableNameProduct )
      .where( { id } )


    if ( records.length === 0 ) {
      throw new Error( `PRODUCT WITH ID=${ id } NOT FOUND` )
    }
  }

  async get(): Promise<IProduct> {
    return knex.queryBuilder()
      .select()
      .from( tableNameProduct )
      .where( { id: this.id } )
      .first()
  }
}
