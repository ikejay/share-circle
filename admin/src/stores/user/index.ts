import { defineStore } from 'pinia'
import { AuthApi } from '../../api/auth'
import { EnumLoadingState } from '../../enums'
import { IRecordUser } from '../../types'

interface IState {
  user: IRecordUser,
  loadingState: EnumLoadingState
}

export const useUserStore = defineStore( 'User', {
  state: (): IState => ( {
    user: null,
    loadingState: EnumLoadingState.INITIAL,
  } ),


  actions: {
    async loadGoogleAuthPage( page: number ) {
      this.loadingState = EnumLoadingState.LOADING

      await AuthApi.loadGoogleAuth()
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.response = response
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },
  },

  getters: {
    getUser: ( state: IState ) => state.user,
  },
} )
