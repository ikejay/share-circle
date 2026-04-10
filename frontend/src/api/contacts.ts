import { api } from 'boot/axios'
import { IConnection, IRecordUser, IPagedResponse } from 'src/types'

const baseUrl: string = '/contacts'

export class ContactsApi {
  static async getConnections(): Promise<IConnection[]> {
    const { data } = await api.get( baseUrl )
    return data
  }

  static async searchUsers( query: string ): Promise<IRecordUser[]> {
    const { data } = await api.get( '/users/search', { params: { q: query } } )
    return data
  }

  static async sendRequest( addresseeId: string ): Promise<IConnection> {
    const { data } = await api.post( baseUrl, { addresseeId } )
    return data
  }

  static async respondToRequest( connectionId: string, accept: boolean ): Promise<IConnection> {
    const { data } = await api.patch( `${ baseUrl }/${ connectionId }`, { accept } )
    return data
  }
}