import { defineStore } from 'pinia'
import { ProductApi } from '../../api/products'
import { EnumLoadingState } from '../../enums'
import { IBrand, IProduct, IProductResponse } from '../../types'

interface IState {
  response: IProductResponse
  workingCopy: IProductResponse | null
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
    workingCopy: null,
    loadingState: EnumLoadingState.INITIAL,
    product: null,
  } ),


  actions: {
    async loadPage( page: number ) {
      this.loadingState = EnumLoadingState.LOADING

      await ProductApi.loadPage( { page, itemsPerPage: 50 } )
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.response = response
          this.workingCopy = JSON.parse( JSON.stringify( response ) )
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          this.response = null
          this.workingCopy = null
          console.log( error )
        } )
    },

    async createProduct( product: Omit<IProduct, 'id'> ) {
      this.loadingState = EnumLoadingState.LOADING

      await ProductApi.addProduct( product )
        .then( ( response: IProduct ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.response.list.push( response )
        } ).catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },

    setValue( attrName: keyof IProduct, id: number, value: never ) {

      const idx = this.response.list.findIndex( product => product.id === id )

      if ( idx !== -1 ) {
        this.workingCopy.list[ idx ][ attrName ] = value
      }
    },

    async bulkUpdate(){
      //TODO Implement bulk edit function to call a function in the product api
    },

    async updateProduct( id: number, payload: Omit<IProduct, 'id'> ) {
      this.loadingState = EnumLoadingState.LOADING

      try {
        const response = await ProductApi.updateProduct( id, payload )
        this.loadingState = EnumLoadingState.LOADED

        const index = this.response.list.findIndex( ( item: IBrand ) => item.id === id )

        if ( index !== -1 ) {
          this.response.list[ index ] = response
        }
      } catch ( err: any ) {
        this.loadingState = EnumLoadingState.ERROR
        console.log( err )
      }
    },

    async loadProductById( id: number ) {
      this.loadingState = EnumLoadingState.LOADING

      await ProductApi.loadById( id )
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.product = response

        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.error( error )
        } )
    },
  },

  getters: {
    getworkingCopyPage: ( state: IState ) => state.workingCopy,
    getPage: ( state: IState ) => state.response,
    getProduct: ( state: IState ) => state.product,
    getNumberOfPages: ( state: IState ) => {
      const { totalCount, paging } = state.response

      if ( ! paging.itemsPerPage ) {
        return 0
      }

      return Math.ceil( totalCount / paging.itemsPerPage )
    },
  },
} )
