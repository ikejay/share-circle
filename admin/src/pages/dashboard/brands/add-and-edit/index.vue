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
        label="Add Brand"
        @close="close"
      />

      <q-card-section>
        <q-form ref="addBrandForm">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-6">
              <q-input
                v-model="brand.name"
                label="Enter Name"
                type="text"
              />
            </div>

            <div class="col-sm-12 col-md-6">
              <q-file
                v-model="brand.logoUrl"
                accept=".jpg, .png, .svg"
                label="Select Logo"
                use-chips
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12">
              <q-select
                v-model="brand.status"
                :options="statusOptions"
                emit-value
                label="Select Status"
                map-options
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
import { EnumBrandStatus } from '../../../../enums'
import { useBrandStore } from '../../../../stores/brand'
import { IBrand } from '../../../../types'


interface IData {
  brand: Omit<IBrand, 'id'>
}

export default defineComponent( {
  components: {
    CardActions,
    DialogHeader,
  },
  computed: {
    BrandStore() {
      return useBrandStore()
    },
    statusOptions() {
      return Object.entries( EnumBrandStatus ).map( ( [ key, value ] ) => ( {
        label: key,
        value: value,
      } ) )
    },
  },
  data(): IData {
    return {
      brand: {
        name: null,
        logoUrl: null,
        status: null,
      },
    }
  },
  defineEmits: [ 'close' ],
  methods: {
    close() {
      this.$emit( 'close' )
      this.resetForm()
    },
    resetForm() {
      this.brand.name = ''
      this.brand.logoUrl = null
    },
    async submit() {
      const form = this.$refs.addBrandForm as InstanceType<typeof QForm>

      if ( form && await form.validate() ) {

        if ( this.editData ) {
          await this.BrandStore.updateBrand( this.editData.id, this.brand )
        } else {
          await this.BrandStore.createBrand(
            {
              ...this.brand,
              status: this.editData ? this.brand.status : EnumBrandStatus.ACTIVE,
            },
          )
        }
        this.close()
      }
    },
  },
  name: 'BrandDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object as PropType<IBrand | null>,
      default: null,
    },
  },

  watch: {
    editData: {
      handler( val: IBrand | null ) {
        if ( val ) {
          this.brand = {
            name: val.name,
            status: val.status,
            logoUrl: null,
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

