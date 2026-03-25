import { defineStore } from 'pinia'
import { AuthApi } from '../../api/auth'
import { EnumLoadingState } from '../../enums'
import { IUser } from '../../types'

interface IState {
  user: IUser,
  isAuthenticated: boolean
  loadingState: EnumLoadingState
}

export const useAuthUserStore = defineStore( 'AuthUser', {
  state: (): IState => ( {
    user: null,
    isAuthenticated: false,
    loadingState: EnumLoadingState.INITIAL,
  } ),

  actions: {
    async checkAuthStatus() {
      this.loadingState = EnumLoadingState.LOADING

      await AuthApi.checkAuthStatus()
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          console.log( 'status here===', response )
          this.isAuthenticated = response.authenticated
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },

    async fetchUserData() {
      this.loadingState = EnumLoadingState.LOADING

      await AuthApi.getUserData()
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.user = response
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR

        } )
    },

    async logout() {
      await AuthApi.logout()
        .then( () => {
          this.user = null
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.error( 'Logout Api Error:', error )
        } )
        .finally( () => {
          this.user = null
          this.isAuthenticated = false
        } )
    },
  },

  getters: {
    getUser: ( state: IState ) => state.user,
    getIsAuthenticated: ( state: IState ) => state.isAuthenticated,
    getLoadingState: ( state: IState ) => state.loadingState,
  },
} )
