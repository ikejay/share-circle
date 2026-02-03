<template>
  <q-page-container class="q-pa-md">
    <admin-table
      :columns="columns"
      :rows="brands"
      title="Brands"
      @add="add"
      @close="close"
      @edit="edit"
      @delete="delete"
    />

    <brand-dialog
      :show-dialog="showAddOrEditDialog"
      :edit-data="editData"
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
    edit(data: IBrand) {
      this.showAddOrEditDialog = true
      this.editData = data
    },
    delete(){

    }
  },

  name: 'IndexPage',
} )
</script>

<style lang="sass">

</style>
