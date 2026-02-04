<template>
  <q-page-container class="q-pa-md">
    <admin-table
      v-model:selected="selectedBrands"
      :columns="columns"
      :rows="brands"
      title="Brands"
      @add="add"
      @close="close"
      @delete="handleDelete"
      @edit="edit"
      @delete:bulk="handleBulkDelete"
    />

    <brand-dialog
      :edit-data="editData"
      :show-dialog="showAddOrEditDialog"
      @close="close"
    />
  </q-page-container>
</template>

<script lang="ts">
import { QTableColumn } from 'quasar'
import { defineComponent } from 'vue'
import AdminTable from '../../../components/table/index.vue'
import { useBrandStore } from '../../../stores/brand'
import { IBrand } from '../../../types'
import BrandDialog from './add-and-edit/index.vue'
import { columns } from './columns'

interface IData {
  showAddOrEditDialog: boolean
  editData: IBrand | null
  selectedBrands: IBrand[]
  columns: QTableColumn[]
}

export default defineComponent( {
  components: {
    BrandDialog,
    AdminTable,
  },
  computed: {
    BrandStore() {
      return useBrandStore()
    },
    brands() {
      return this.BrandStore.response.list
    },
    pagesTotal() {
      return this.BrandStore.getNumberOfPages
    },
    currentPage: {
      get(): number {
        return this.BrandStore.response.paging.page
      },
      set( page: number ) {
        this.BrandStore.loadPage( page )
      },
    },
  },

  created(): any {
    if ( ! this.brands.length ) {
      this.BrandStore.loadPage( 1 )
    }
  },

  data(): IData {
    return {
      showAddOrEditDialog: false,
      editData: null,
      selectedBrands: [],
      columns,
    }
  },

  methods: {
    add() {
      this.showAddOrEditDialog = true
    },
    close() {
      this.showAddOrEditDialog = false
    },
    edit( data: IBrand ) {
      this.showAddOrEditDialog = true
      this.editData = data
    },
    async processBulkDelete() {
      const selectedIds = this.selectedBrands.map( ( brand: IBrand ) => brand.id )
      await this.BrandStore.bulkDelete( selectedIds )
        .then( () => {
          this.selectedBrands = null
        } ).catch( ( err: any ) => {
          console.log( err )
        } )

    },
    async processDeleteById( id: number ) {
      if ( ! id ) {
        return
      }

      await this.BrandStore.deleteBrandById( id )
        .then( () => {
          this.$q.notify( {
            textColor: 'white',
            color: 'positive',
            message: 'Brand Successfully Deleted',
          } )
        } ).catch( ( err: any ) => {
          console.log( err )
          this.$q.notify( {
            textColor: 'white',
            color: 'negative',
            message: 'Brand Successfully Deleted',
          } )
        } )
    },
    handleBulkDelete( selectedBrands: IBrand[] ) {
      this.selectedBrands = selectedBrands

      this.$q.dialog( {
        title: 'Confirm Deletion',
        message: `You are about to process ${ this.selectedBrands.length } brands.
              Brands currently linked to products cannot be deleted and
              will be marked as "Deprecated" to preserve product history.
              Do you want to proceed?`,
        cancel: true,
        persistent: true,
        color: 'warning',
      } ).onOk( () => this.processBulkDelete() )
    },

    handleDelete( item: IBrand ) {
      console.log( 'To be deleted', item )
      this.$q.dialog( {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ${ item.name } brand ?`,
        cancel: true,
        persistent: true,
        color: 'warning',
      } ).onOk( () => this.processDeleteById( item.id ) )
    },
  },

  name: 'IndexPage',
} )
</script>

<style lang="sass">

</style>
