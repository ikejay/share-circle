<template>
  <q-page-container class="q-pa-lg page-wrapper">
    <div class="flex justify-center">
      <div class="row q-col-gutter-md">
        <div v-for="product in products" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card
            class="product-card q-pa-md"
            @click="$router.push(`/product/${product.id}`)"
          >
            <q-img
              :src="product.imageUrl"
              spinner-color="primary"
            />

            <q-card-section>
              <div class="text-h6">{{ product.name }}</div>
              <div class="text-subtitle2"> {{ product.description }}</div>
            </q-card-section>

            <q-separator/>

            <q-card-section>
              <div class="text-h6">€{{ product.price }}</div>
              <q-badge :color="product.status === `ACTIVE` ? green : grey"
              >
                {{ product.status }}
              </q-badge>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="pagination-wrapper">
      <q-pagination
        v-model="currentPage"
        :max="pagesTotal"
        active-color="gray"
        active-design="unelevated"
        active-text-color="white"
        color="white"
        direction-links
        outline
        size="lg"
      />
    </div>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProductStore } from '../../stores/product'

export default defineComponent( {
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

  created(): any {
    if ( ! this.products.length ) {
      this.ProductStore.loadPage( 1 )
    }
  },

  name: 'IndexPage',
} )
</script>

<style lang="sass">
.product-card
  transition: transform 0.2s ease
  border-radius: 10px

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15)

.page-wrapper
  display: flex
  flex-direction: column
  align-items: center
  height: 100%
  min-height: 100vh
  padding-bottom: 80px

.pagination-wrapper
  display: flex
  position: sticky
  justify-content: center
  background: lightslategray
  margin: 20px
  bottom: 10px

</style>
