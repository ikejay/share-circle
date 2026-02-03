<template>
  <q-card-actions :class="classes + 'bg-' + actionsBgColor">
    <q-btn
      :dense="dense"
      :disable="disable"
      :icon-left="cancelIconLeft"
      :label="cancelLabel"
      :no-caps="noCaps"
      @click="$emit('close')"
    />

    <q-space/>

    <q-btn
      :color="submitDisable ? 'grey' : submitColor"
      :dense="dense"
      :disable="submitDisable"
      :icon="submitIcon"
      :icon-left="submitIconLeft"
      :loading="submitLoading"
      :label="submitLabel"
      :no-caps="noCaps"
      @click="$emit('submit')"
      @click.prevent="submitClickPrevent"
    />
  </q-card-actions>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  defineEmits: [ 'closes', 'submit' ],
  name: 'CardActions',
  props: {
    classes: {
      type: String,
      default: '',
    },
    actionsBgColor: {
      type: String,
      default: 'grey-3',
    },
    cancelLabel: {
      type: String,
      default: undefined,
    },
    cancelIconLeft: {
      type: String,
      default: undefined,
    },
    submitIcon: {
      type: String,
      default: undefined,
    },
    submitLabel: {
      type: String,
      default: undefined,
    },
    submitIconLeft: {
      type: String,
      default: undefined,
    },
    submitDisable: {
      type: Boolean,
      default: false,
    },
    submitColor: {
      type: String,
      default: 'primary',
    },
    submitLoading: {
      type: Boolean,
      default: false,

    },
    dense: {
      type: Boolean,
      default: false,
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    submitClickPrevent: {
      type: Function,
      default: () => {
        return true
      },
    },
    noCaps: {
      type: Boolean,
      default: false,
    },
  },
} )
</script>
