<template>
  <q-page-container class="q-pa-md">
    <admin-table
      v-model:selected="selectedProducts"
      :columns="columns"
      :enable-save-btn="hasChanged"
      :rows="workingCopyProducts"
      :show-bulk-edit="true"
      title="Products"
      @add="add"
      @close="close"
      @edit="edit"
      @save="save"
      @set-value="setValue"
    />

    <product-dialog
      :edit-data="editData"
      :show-dialog="showAddOrEditDialog"
      @close="close"
    />
  </q-page-container>
</template>

<script lang="ts">
import deepEqual from 'deep-equal'
import { QTableColumn } from 'quasar'
import { defineComponent } from 'vue'
import AdminTable from '../../../components/table/index.vue'
import { useProductStore } from '../../../stores/product'
import { IProduct } from '../../../types'
import ProductDialog from './add-and-edit/index.vue'
import { columns } from './columns'

interface IData {
  showAddOrEditDialog: boolean,
  editData: IProduct | null,
  columns: QTableColumn[],
  selectedProducts: IProduct[]
}

export default defineComponent( {
  components: {
    ProductDialog,
    AdminTable,
  },
  computed: {
    ProductStore() {
      return useProductStore()
    },
    hasChanged() {
      return ! deepEqual( this.originalProducts, this.workingCopyProducts )
    },
    originalProducts() {
      return this.ProductStore.response.list || []
    },
    workingCopyProducts() {
      return this.ProductStore.workingCopy?.list || []
    },
    pagesTotal() {
      return this.ProductStore.getNumberOfPages
    },
    currentPage: {
      get(): number {
        return this.ProductStore.response.paging.page
      },
      set( page: number ) {
        this.ProductStore.loadPage( page )
      },
    },
  },

  created(): any {
    this.ProductStore.loadPage( 1 )
  },

  data(): IData {
    return {
      showAddOrEditDialog: false,
      editData: null,
      columns,
      selectedProducts: [],
    }
  },

  methods: {
    add() {
      this.showAddOrEditDialog = true
    },
    async save() {
      await this.ProductStore.bulkUpdate()
    },
    edit( data: IProduct ) {
      this.showAddOrEditDialog = true
      this.editData = data
    },
    close() {
      this.showAddOrEditDialog = false
    },
    setValue( { id, attrName, value }: any ) {
      this.ProductStore.setValue( attrName, id, value )
    },
  },

  name: 'ProductsPage',
} )
</script>

<style lang="sass">

</style>
