<template>
  <q-page-container class="q-pa-md">
    <admin-table
      :columns="columns"
      :rows="products"
      title="Products"
    />
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminTable from '../../../components/table/index.vue'
import { useProductStore } from '../../../stores/product'
import { columns } from './columns'

export default defineComponent( {
  components: {
    AdminTable,
  },
  computed: {
    ProductStore() {
      return useProductStore()
    },
    products() {
      return this.ProductStore.response.list
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

  data() {
    return {
      columns,
    }
  },

  created(): any {
    if ( ! this.products.length ) {
      this.ProductStore.loadPage( 1 )
    }
  },

  name: 'IndexPage',
} )
</script>

<style lang="sass">

</style>
