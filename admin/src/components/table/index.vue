<template>
  <q-table
    v-model:selected="selectedBrands"
    :columns="columns"
    :pagination="initialPagination"
    :rows="rows"
    :title="title"
    bordered
    flat
    row-key="id"
    selec
    selection="multiple"
  >
    <template v-slot:top-right>
      <q-btn
        :label="`Add ${title}`"
        color="primary"
        icon="add"
        @click="$emit('add')"
      />
      <q-btn
        v-if="selectedBrands.length > 0"
        label="Bulk Delete"
        color="red"
        icon="delete"
        @click="$emit('delete', selectedBrands)"
      />
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-x-sm">
        <q-btn
          color="primary"
          icon="edit"
          @click="$emit('edit', props.row)"
        />
      </q-td>
    </template>

    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope"/>
    </template>

    <template v-slot:pagination="scope">
      <q-btn
        v-if="scope.pagesNumber > 2"
        :disable="scope.isFirstPage"
        color="grey-8"
        dense
        flat
        icon="first_page"
        round
        @click="scope.firstPage"
      />

      <q-btn
        :disable="scope.isFirstPage"
        color="grey-8"
        dense
        flat
        icon="chevron_left"
        round
        @click="scope.prevPage"
      />

      <q-btn
        :disable="scope.isLastPage"
        color="grey-8"
        dense
        flat
        icon="chevron_right"
        round
        @click="scope.nextPage"
      />

      <q-btn
        v-if="scope.pagesNumber > 2"
        :disable="scope.isLastPage"
        color="grey-8"
        dense
        flat
        icon="last_page"
        round
        @click="scope.lastPage"
      />
      {{selectedBrands}}
    </template>
  </q-table>
</template>

<script lang="ts">
import { QTableColumn } from 'quasar'
import { defineComponent, PropType } from 'vue'
import { IBrand } from '../../types'

interface IData {
  selectedBrands: IBrand[]
}

export default defineComponent( {
  computed: {
    initialPagination() {
      return {
        rowsPerPage: 20,
        page: 1,
        sortBy: 'lastUpdatedAt',
      }
    },
  },

  data(): IData {
    return {
      selectedBrands: [],
    }
  },

  emits: [ 'add', 'edit', 'delete' ],

  name: 'AdminTable',
  props: {
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
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
} )
</script>

<style lang="sass" scoped>

</style>
