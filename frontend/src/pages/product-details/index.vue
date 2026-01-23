<template>
  <q-page class="q-pa-lg full-width flex justify-center">
    <div class="detail-container">

      <q-btn
        class="q-mb-md"
        flat
        icon="arrow_back"
        label="Back"
        @click="$router.back()"
      />
      <q-card v-if="product" class="product-detail-card">
        <q-img
          :src="product.imageUrl"
          spinner-color="primary"
        />

        <q-card-section>
          <div class="text-h4">{{ product.name }}</div>
          <div class="text-subtitle1 text-grey">
            {{ product.brand.name }}
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <div class="text-body1 q-mb-md">
            {{ product.description }}
          </div>

          <div class="row items-center justify-between">
            <div class="text-h5 text-primary">
              €{{ product.price }}
            </div>

            <q-badge
              :color="product.status === 'ACTIVE' ? 'green' : 'grey'"
              align="middle"
            >
              {{ product.status }}
            </q-badge>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-section class="row items-center justify-between">
          <div>
            <strong>Stock:</strong> {{ product.stockQuantity }}
          </div>

          <q-btn
            :disable="product.stockQuantity === 0"
            color="primary"
            label="Add to cart"
          />
        </q-card-section>
      </q-card>

      <q-inner-loading :showing="isLoading"/>
    </div>
  </q-page>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/product'

export default defineComponent( {
  computed: {
    ProductStore() {
      return useProductStore()
    },
    Route() {
      return useRoute()
    },
    product() {
      return this.ProductStore.product
    },
    isLoading() {
      return this.ProductStore.loadingState
    },
  },
  mounted(): any {
    const id = Number( this.Route.params.id )
    if ( id ) {
      this.ProductStore.loadProductById( id )
    }
  },
  name: 'index',
} )
</script>

<style lang="sass" scoped>

</style>
