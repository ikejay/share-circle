import { defineStore } from 'pinia'
import { AuthApi } from 'src/api/auth'
import { EnumLoadingState } from 'src/enums'
import { IUser } from 'src/types'

interface IState {
  user: IUser | null,
  isAuthenticated: boolean,
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

      return AuthApi.checkAuthStatus()
        .then( ( isAuthenticated ) => {
          this.isAuthenticated = isAuthenticated
          this.loadingState = EnumLoadingState.LOADED
        } )
        .catch( ( error: any ) => {
          console.log( error )
          this.loadingState = EnumLoadingState.ERROR
        } )
    },

    async fetchUser() {
      this.loadingState = EnumLoadingState.LOADING

      return AuthApi.getUserData()
        .then( ( response: IUser ) => {
          this.user = response
          this.loadingState = EnumLoadingState.LOADED
        } )
        .catch( ( error: any ) => {
          console.log( error )
          this.loadingState = EnumLoadingState.ERROR
        } )
    },

    clearAuth() {
      this.user = null
      this.isAuthenticated = false
      this.loadingState = EnumLoadingState.INITIAL
    },
  },

  getters: {
    isLoading: ( state: IState ) => state.loadingState === EnumLoadingState.LOADING,
    hasError: ( state: IState ) => state.loadingState === EnumLoadingState.ERROR,
  },
} )
