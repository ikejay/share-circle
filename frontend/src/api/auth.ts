import { api } from 'boot/axios'

const baseUrl: string = '/auth'

export class AuthApi {
  static async loadGoogleAuth() {
    const { data } = await api.get( `${ baseUrl }/google` )
    return data
  }

  static async checkAuthStatus(): Promise<boolean> {
    const { data } = await api.get( `${ baseUrl }/check` )
    return data.isAuthenticated
  }

  static async getUserData() {
    const { data } = await api.get( `${ baseUrl }/who-am-i` )
    return data
  }

  static async logout() {
    const { data } = await api.get( `${ baseUrl }/logout` )
    return data
  }
}
