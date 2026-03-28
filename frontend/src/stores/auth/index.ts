import { defineStore } from 'pinia'
import { AuthApi } from 'src/api/auth'
import { EnumLoadingState } from 'src/enums'
import { IRecordUser, IUser, TuserStatus } from 'src/types'

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
      await AuthApi.checkAuthStatus()
        .then( ( response: TuserStatus ) => {
          this.isAuthenticated = response.isAuthenticated
          this.loadingState = EnumLoadingState.LOADED
        } )
        .catch( ( error: any ) => {
          console.log( error )
          this.loadingState = EnumLoadingState.ERROR
        } )
    },

    async fetchUser() {
      this.loadingState = EnumLoadingState.LOADING
      await AuthApi.getUserData()
        .then((response: IUser)=> {
          this.user = response
          this.loadingState = EnumLoadingState.LOADED
        })
        .catch((error: any) => {
          console.log(error)
          this.loadingState = EnumLoadingState.ERROR
        })
    },

    clearAuth() {
      this.user = null
      this.isAuthenticated = false
      this.loadingState = EnumLoadingState.INITIAL
    },
  },

  getters: {
    getUser: ( state: IState ) => state.user,
    getIsAuthenticated: ( state: IState ) => state.isAuthenticated,
    getLoadingState: ( state: IState ) => state.loadingState,
  },

})
