import { defineStore } from 'pinia'
import { BrandApi } from '../../api/brand'
import { EnumBrandStatus, EnumLoadingState } from '../../enums'
import { IBrand, IProductResponse } from '../../types'

interface IState {
  response: IProductResponse,
  loadingState: EnumLoadingState
  selectedBrands: IBrand[]
  brand: IBrand
}

export const useBrandStore = defineStore( 'Brand', {
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
    selectedBrands: [],
    brand: null,
  } ),


  actions: {
    async loadPage( page: number ) {
      this.loadingState = EnumLoadingState.LOADING

      await BrandApi.loadPage( { page, itemsPerPage: 9 } )
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.response = response
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },

    async deleteBrandById( id: number ) {
      this.loadingState = EnumLoadingState.LOADING

      try {
        const { deleted, deletedId } = await BrandApi.deleteById( id )
        this.loadingState = EnumLoadingState.LOADED

        if ( deleted ) {
          this.response.list = this.response.list.filter( ( brand: IBrand ) => brand.id !== deletedId )
        } else {
          this.response.list = this.response.list.map( ( brand: IBrand ) => {
            if ( deletedId === brand.id ) {
              return {
                ...brand,
                status: EnumBrandStatus.DEPRECATED,
              }
            }
            return brand
          } )
        }


      } catch ( err ) {
        this.loadingState = EnumLoadingState.ERROR
        throw err
      }
    },

    async bulkDelete( brandIds: number[] ) {
      this.loadingState = EnumLoadingState.LOADING

      try {
        const { deletedIds, deprecatedIds } = await BrandApi.deleteBrandBulk( brandIds )

        if ( deletedIds.length > 0 ) {
          this.response.list = this.response.list.filter( ( brand: IBrand ) => ! deletedIds.includes( brand.id ) )
        }

        if ( deprecatedIds.length > 0 ) {
          this.response.list = this.response.list.map( ( brand: IBrand ) => {
            if ( deprecatedIds.includes( brand.id ) ) {
              return {
                ...brand,
                status: EnumBrandStatus.DEPRECATED,
              }
            }
            return brand
          } )
        }
        this.loadingState = EnumLoadingState.LOADED
        return {
          deletedCount: deletedIds.length,
          deprecatedCount: deprecatedIds.length,
        }
      } catch ( err: any ) {
        this.loadingState = EnumLoadingState.ERROR
        throw err
      }
    },

    async createBrand( brand: Omit<IBrand, 'id'> ) {
      this.loadingState = EnumLoadingState.LOADING

      await BrandApi.addBrand( brand )
        .then( ( response: IBrand ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.response.list.push( response )
        } ).catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },

    async updateBrand( id: number, payload: Omit<IBrand, 'id'> ) {
      this.loadingState = EnumLoadingState.LOADING

      try {
        const response = await BrandApi.updateBrand( id, payload )
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

    async loadBrandById( id: number ) {
      this.loadingState = EnumLoadingState.LOADING

      await BrandApi.loadById( id )
        .then( ( response ) => {
          this.loadingState = EnumLoadingState.LOADED
          this.product = response
        } )
        .catch( ( error: any ) => {
          this.loadingState = EnumLoadingState.ERROR
          console.log( error )
        } )
    },
  },

  getters: {
    getPage: ( state: IState ) => state.response,
    getBrand: ( state: IState ) => state.brand,
    getNumberOfPages: ( state: IState ) => {
      const { totalCount, paging } = state.response

      if ( ! paging.itemsPerPage ) {
        return 0
      }

      return Math.ceil( totalCount / paging.itemsPerPage )
    },
  },
} )
