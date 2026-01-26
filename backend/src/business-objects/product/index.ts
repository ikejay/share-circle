import Bluebird from 'bluebird'
import { EnumBrandStatus, EnumProductStatus } from '../../../types-and-enums/enums'
import { snakeToCamelRecord } from '../../helpers/converters'
import { knex } from '../../postgres'
import { tableNameProduct } from '../../seeder/products'
import { IPaging, IProduct, IProductRecord, IProductResponse } from '../../types'
import { Brand } from '../brand'

const DOUBLICATE_KEY_ERROR = '23503'

export class Product {
  constructor( protected id: number ) {
  }

  static async create( name: string, brandId: number ): Promise<IProduct> {
    if ( name.length === 0 ) {
      throw new Error( 'PRODUCT NAME IS EMPTY' )
    }

    if ( brandId === 0 ) {
      throw new Error( 'INVALID BRAND ID' )
    }

    const trimmedName = name = name.trim()

    if ( name.length > 35 ) {
      throw new Error( 'PRODUCT NAME IS TOO LONG' )
    }

    try {
      const [ { id } ] = await knex( tableNameProduct ).insert( { trimmedName, brandId }, [ 'id' ] )

      return new Product( id ).get()

    } catch ( err: any ) {
      if ( err.code === DOUBLICATE_KEY_ERROR ) {
        throw new Error( 'FAILED TO CREATE PRODUCT' )
      }

      throw err
    }
  }

  static async getPage( paging: IPaging ): Promise<IProductResponse> {
    const offset = ( paging.page - 1 ) * paging.itemsPerPage

    const records = await knex.queryBuilder()
      .select()
      .from( tableNameProduct )
      .where( 'status', EnumBrandStatus.ACTIVE )
      .orderBy( 'id' )
      .offset( offset )
      .limit( paging.itemsPerPage )

    const list = await Bluebird.mapSeries( records.map( snakeToCamelRecord ), async ( product: any ) => {
      const brandId = product.brandId
      delete product.brandId

      return {
        ...product,
        brand: await Brand.getById( brandId ),
      }
    } ) as IProduct[]

    const numberOfProducts = await knex( tableNameProduct )
      .count<{ count: number }[]>( '* as count' )
      .where( 'status', EnumProductStatus.ACTIVE )

    const totalCount = numberOfProducts[ 0 ].count

    return {
      list,
      totalCount,
      paging,
    }
  }

  static async getProductById( id: number ) {
    const records: IProductRecord[] = await knex.queryBuilder()
      .select()
      .from( tableNameProduct )
      .where( 'id', id )

    if ( records.length === 0 ) {
      throw new Error( 'PRODUCT DOES NOT EXIST' )
    }

    const product = snakeToCamelRecord( records[ 0 ] )

    product.brand = await Brand.getById( product.brandId )
    delete product.brandId

    return product as IProduct
  }

  protected async get(): Promise<IProduct> {
    const records = await knex.queryBuilder().select().from( tableNameProduct ).where( { id: this.id } )

    if ( records.length === 0 ) {
      throw new Error( 'FAILED TO CREATE PRODUCT' )
    }

    return records[ 0 ]
  }
}
