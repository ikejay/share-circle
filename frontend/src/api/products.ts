import { api } from 'boot/axios'
import { IPaging, IProductResponse } from 'src/types'

const baseUrl = '/products'

export class ProductApi {
  static async loadPage( paging: IPaging ): Promise<IProductResponse> {
    const { data } = await api.post( baseUrl, { paging } )
    return data
  }

  static async loadById( id: number ) {
    const { data } = await api.get( `${ baseUrl }/${ id }` )
    return data
  }
}
