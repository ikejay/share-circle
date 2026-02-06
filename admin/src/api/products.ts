import { api } from 'boot/axios'
import { IPaging, IProduct, IProductResponse } from 'src/types'

const baseUrl = '/products'

export class ProductApi {
  static async loadPage( paging: IPaging ): Promise<IProductResponse> {
    const { data } = await api.post( baseUrl, { paging } )
    return data
  }

  static async addProduct( product: Omit<IProduct, 'id'> ) {
    const { data } = await api.post( `${ baseUrl }/create`, product )
    return data
  }

  static async updateProduct( id: number, payload: Omit<IProduct, 'id'> ) {
    const { data } = await api.put( `${ baseUrl }/${ id },`, payload )
    return data
  }

  static async loadById( id: number ) {
    const { data } = await api.get( `${ baseUrl }/${ id }` )
    return data
  }
}
