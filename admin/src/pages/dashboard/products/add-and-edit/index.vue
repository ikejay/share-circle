<template>
  <q-dialog
    :model-value="showDialog"
    persistent
    @escape-key="close"
  >
    <q-card v-if="showDialog" style="width: 1000px">
      <dialog-header
        bg-color="blue-1"
        icon="add"
        label="Add Product"
        @close="close"
      />

      <q-card-section>
        <q-form ref="addProductForm" :greedy="!!editData">
          <div class="row q-col-gutter-sm q-mb-lg">
            <div class="col-sm-12 col-md-6">
              <q-input
                v-model="product.name"
                :rules="[(val:any) => !!val || 'Name is required']"
                dense
                filled
                label="Enter Name"
                type="text"
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <q-input
                v-model="product.productCode"
                :rules="[(val:any) => !!val || 'Product code is required']"
                dense
                filled
                label="Enter Code"
                type="text"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mb-lg">
            <div class="col-sm-12">
              <q-input
                v-model="product.description"
                dense
                filled
                label="Enter Description"
                type="textarea"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mb-lg">
            <div class="col-sm-12">
              <q-select
                v-model="product.brandId"
                :options="brandOptions"
                :rules="[(val:any) => !!val || 'Brand is required']"
                dense
                emit-value
                filled
                label="Select Brand"
                map-options
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mb-lg">
            <div class="col-sm-12 col-md-6">
              <q-file
                v-model="product.imageUrl"
                accept=".jpg, .png, .svg"
                dense
                filled
                label="Select Image"
                use-chips
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <q-select
                v-model="product.status"
                :options="statusOptions"
                :rules="[(val:any) => !!val || 'Status is required']"
                dense
                emit-value
                filled
                label="Select Status"
                map-options
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mb-lg">
            <div class="col-sm-12 col-md-6">
              <q-input
                v-model.number="product.price"
                :rules="[(val:any) => val > 0 || 'Price should be greater than 0']"
                dense
                filled
                label="Enter Price"
                prefix="€"
                step="0.01"
                type="number"
                use-chips
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <q-input
                v-model.number="product.stockQuantity"
                :rules="[(val:any) => val >= 0 || 'Stock cannot be negative']"
                dense
                filled
                label="Enter Stock Quantity"
                type="text"
                use-chips
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-separator/>

      <card-actions
        cancelLabel="Cancel"
        submitLabel="Save"
        @close="close"
        @submit="submit"
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { QForm } from 'quasar'
import { defineComponent, PropType } from 'vue'
import CardActions from '../../../../components/card/card-actions/index.vue'
import DialogHeader from '../../../../components/dialog/header/index.vue'
import { EnumProductStatus } from '../../../../enums'
import { useBrandStore } from '../../../../stores/brand'
import { useProductStore } from '../../../../stores/product'
import { IBrand, IProduct, IProductRecord } from '../../../../types'


interface IData {
  product: Omit<IProductRecord, 'id'>
}

export default defineComponent( {
  setup() {
    const BrandStore = useBrandStore()
    const ProductStore = useProductStore()

    return {
      BrandStore,
      ProductStore,
    }
  },

  components: {
    CardActions,
    DialogHeader,
  },

  computed: {
    statusOptions() {
      return Object.entries( EnumProductStatus ).map( ( [ key, value ] ) => ( {
        label: key,
        value: value,
      } ) )
    },
    brandOptions() {
      return this.BrandStore.currentPage.list.map( ( brand: IBrand ) => ( {
        label: brand.name,
        value: brand.id,
      } ) )
    },
  },

  created(): any {
    this.init().then().catch( console.error )
  },

  data(): IData {
    return {
      product: {
        name: null,
        productCode: null,
        description: null,
        imageUrl: null,
        stockQuantity: 0,
        price: 0,
        brandId: null,
        status: null,
      },
    }
  },

  defineEmits: [ 'close' ],

  methods: {
    async init() {
      await this.BrandStore.loadAll()
    },
    close() {
      this.$emit( 'close' )
      this.resetForm()
    },
    resetForm() {
      this.product.name = ''
      this.product.imageUrl = null
    },
    async submit() {
      const form = this.$refs.addProductForm as InstanceType<typeof QForm>

      if ( form && await form.validate() ) {

        if ( this.editData ) {
          await this.ProductStore.updateProduct( this.editData.id, this.product )
        } else {
          await this.ProductStore.createProduct( {
              ...this.product,
              imageUrl: null,
              status: EnumProductStatus.PENDING,
            },
          )
        }
        this.close()
      }
    },
  },

  name: 'ProductDialog',

  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object as PropType<IProduct | null>,
      default: null,
    },
  },

  watch: {
    editData: {
      handler( val: IProduct | null ) {
        if ( val ) {
          this.product = {
            name: val.name,
            status: val.status,
            productCode: val.productCode,
            description: val.description,
            imageUrl: null,
            stockQuantity: val.stockQuantity,
            price: val.price,
            brandId: val.brand.id,
          }
        } else {
          this.resetForm()
        }
      },
      immediate: true,
    },
  },
} )
</script>

