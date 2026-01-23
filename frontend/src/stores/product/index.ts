import { defineStore } from 'pinia'
import { ProductApi } from '../../api/products'
import { EnumLoadingState } from '../../enums'
import { IProduct, IProductResponse } from '../../types'

interface IState {
  response: IProductResponse,
  loadingState: EnumLoadingState
  product: IProduct
}

export const useProductStore = defineStore( 'Product', {
  state: (): IState => ( {
    response: {
      list: [],
      totalCount: 0,
      paging: {
        page: 0,
        itemsPerPage: 0,
      },
    },
    loadingState: EnumLoadingState.INITIAL,
    product: null,
  } ),


  actions: {
    async loadPage( page: number ) {
      this.loadingState = EnumLoadingState.LOADING
      await ProductApi.loadPage( {
        page,
        itemsPerPage: 9,
      } ).then( ( response ) => {
        this.loadingState = EnumLoadingState.LOADED
        this.response = response
      } ).catch( ( error: any ) => {
        this.loadingState = EnumLoadingState.ERROR
        console.log( error )
      } )
    },

    async loadProductById( id: number ) {
      this.loadingState = EnumLoadingState.LOADING
      await ProductApi.loadById( id )
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.product = response
        } ).catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },
  },

  getters: {
    getPage: ( state: IState ) => state.response,
    getProduct: (state: IState)=> state.product,
    getNumberOfPages: ( state: IState ) => {
      const { totalCount, paging } = state.response

      console.log( 'Total count here', totalCount )
      if ( ! paging.itemsPerPage ) return 0
      return Math.ceil( totalCount / paging.itemsPerPage )
    },
  },
} )
