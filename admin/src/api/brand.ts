import { api } from 'boot/axios'
import { IBrand, IPaging } from 'src/types'

const baseUrl = '/brands'

export class BrandApi {
  static async loadPage( paging: IPaging ): Promise<IBrand> {
    const { data } = await api.post( baseUrl, { paging } )
    return data
  }

  static async loadById( id: number ) {
    const { data } = await api.get( `${ baseUrl }/${ id }` )
    return data
  }

  static async addBrand( brand: Omit<IBrand, 'id'> ) {
    const { data } = await api.post( `${ baseUrl }/create`, brand )
    return data
  }

  static async updateBrand( id: number, payload: Omit<IBrand, 'id'> ) {
    const { data } = await api.put( `${ baseUrl }/${ id },`, payload )
    return data
  }

  // TODO Implement delete method for both bulk and  single delete
  static async deleteBrand(){

  }
}
