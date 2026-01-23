<template>
  <q-page class="q-pa-md q-pa-lg-md full-width">
    <div class="detail-container q-mx-auto" style="max-width: 1100px;">

      <div class="row items-center q-mb-lg">
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="arrow_back"
          round
          @click="$router.back()"
        />
        <div class="text-h5 text-weight-medium">Product Details</div>
      </div>

      <q-card v-if="product" bordered class="product-detail-card overflow-hidden" flat>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <q-img
              :src="product.imageUrl"
              class="product-image"
              fit="contain"
              ratio="1"
              spinner-color="primary"
              style="background: #f8f9fa;"
            >
              <template v-slot:loading>
                <q-spinner color="primary" size="3em"/>
              </template>
            </q-img>
          </div>

          <div class="col-12 col-md-6 q-pa-lg">
            <div class="text-h4 text-weight-bold q-mb-xs">
              {{ product.name }}
            </div>

            <div class="text-subtitle1 text-grey-8 q-mb-md">
              {{ product.brand?.name || 'Brand' }}
            </div>

            <q-separator class="q-my-md" spaced/>

            <div class="text-body1 text-grey-9 q-mb-xl pre-line">
              {{ product.description }}
            </div>

            <div class="row items-center justify-between q-mb-xl">
              <div class="text-h4 text-weight-bold text-primary">
                €{{ Number( product.price ).toFixed( 2 ) }}
              </div>

              <q-badge
                :color="product.status === 'ACTIVE' ? 'positive' : 'grey-7'"
                class="text-uppercase text-bold"
                outline
                text-color="white"
              >
                {{ product.status }}
              </q-badge>
            </div>

            <div class="row items-center q-mb-lg">
              <div class="text-subtitle1 q-mr-md">
                <strong>Stock:</strong>
                <span :class="product.stockQuantity <= 5 ? 'text-negative' : 'text-positive'">
                  {{ product.stockQuantity }}
                </span>
                {{ product.stockQuantity <= 5 ? ' (low stock!)' : '' }}
              </div>
            </div>

            <div class="action-area">
              <q-btn
                :disable="product.stockQuantity === 0 || product.status !== 'ACTIVE'"
                :loading="addingToCart"
                class="full-width q-mb-sm"
                color="primary"
                icon-right="shopping_cart"
                label="Add to Cart"
                size="lg"
                unelevated
                @click="addToCart"
              />

              <q-btn
                class="full-width"
                color="primary"
                flat
                icon="favorite_border"
                label="Add to Wishlist"
              />
            </div>
          </div>
        </div>
      </q-card>

      <q-inner-loading :showing="isLoading">
        <q-spinner color="primary" size="70px"/>
      </q-inner-loading>

      <div v-if="!product && !isLoading" class="text-center q-pa-xl text-grey-7">
        <q-icon class="q-mb-md" name="inventory_2" size="5rem"/>
        <div class="text-h6">Product not found</div>
      </div>
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
.detail-container
  max-width: 1200px
  margin: 0 auto

.product-detail-card
  border-radius: 12px
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
  overflow: hidden
  background: white
</style>
