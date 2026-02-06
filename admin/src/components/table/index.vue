<template>
  <q-table
    :columns="columns"
    :pagination="initialPagination"
    :rows="rows"
    :selected="selected"
    :title="title"
    bordered
    flat
    row-key="id"
    selection="multiple"
    v-bind="$attrs"
    @update:selected="(val: any) => $emit('update:selected', val)"
  >
    <template v-slot:top-right>
      <q-btn
        :disable="isItemSelected"
        color="primary"
        icon="add"
        @click="$emit('add')"
      >
        Add {{ title }}
        <q-tooltip v-if="isItemSelected" :offset="[10, 10]" class="bg-grey-7">
          Can't use when {{ title }} selected
        </q-tooltip>
      </q-btn>
      <q-btn
        v-if="isItemSelected && showRemove"
        class="q-ml-lg"
        color="red"
        icon="delete"
        label="Bulk Delete"
        @click="$emit('remove:bulk', selected)"
      />
      <Teleport defer to="#save">
        <q-btn
          v-if="enableSaveBtn"
          color="orange-8"
          flat
          icon="save"
          size="md"
          @click="$emit('save')"
        />
      </Teleport>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-x-sm">
        <q-btn
          class="q-ml-none q-pl-none"
          color="primary"
          flat
          icon="edit"
          @click="$emit('edit', props.row)"
        />
        <q-btn
          v-if="showRemove"
          class="q-ml-none"
          color="red"
          flat
          icon="remove"
          @click="$emit('remove', props.row)"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-name="{ value, row }">
      <q-input
        :model-value="value"
        filled
        @update:model-value="value => setValue('name', row.id,value)"
      />
    </template>

    <template v-slot:body-cell-price="{ value, row }">
      <q-input
        :model-value="value"
        filled
        @update:model-value="value => setValue('price', row.id,value)"
      />
    </template>
  </q-table>
</template>

<script lang="ts">
import { QTableColumn } from 'quasar'
import { defineComponent, PropType } from 'vue'
import { IProductRecord } from '../../types'

export default defineComponent( {
  computed: {
    initialPagination() {
      return {
        rowsPerPage: 20,
        page: 1,
        sortBy: 'lastUpdatedAt',
      }
    },
    isItemSelected() {
      return this.selected.length > 0
    },
  },

  emits: [ 'add', 'edit', 'save', 'remove:bulk', 'setValue', 'remove', 'update:selected' ],

  methods: {
    setValue( attrName: keyof IProductRecord, id: number, value: string ) {
      this.$emit( 'setValue', { attrName, id, value } )
    },
  },

  name: 'AdminTable',

  props: {
    selected: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array as PropType<QTableColumn[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showRemove: {
      type: Boolean,
      default: false,
    },
    enableSaveBtn: {
      type: Boolean,
      default: false,
    },
    showBulkEdit: {
      type: Boolean,
      default: false,
    },
  },
} )
</script>

<style lang="sass" scoped>

</style>
