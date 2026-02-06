<template>
  <q-bar :class="classes + 'bg-' + bgColor" :style="style" class="text-white">
    <q-icon
      v-if="icon"
      :name="icon"
      :size="iconSize"
    />

    <div>
      {{ label }}
      <span v-if="subTitle" class="text-body2">{{ subTitle }}</span>
    </div>

    <q-space/>

    <slot name="other"></slot>

    <q-btn
      dense
      flat
      icon="close"
      @click="close"
    />
  </q-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  defineEmits: [ 'close' ],

  methods: {
    close() {
      this.$emit( 'close' )
    },
  },

  name: 'DialogHeader',

  props: {
    icon: {
      type: String,
      default: 'plus',
    },
    iconSize: {
      type: String,
      default: '24px',
    },
    bgColor: {
      type: String,
      default: 'teal-1',
    },
    style: {
      type: [ String, Object ],
      default: '',
    },
    label: {
      type: String,
      default: undefined,
    },
    subTitle: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: undefined,
    },
  },
} )
</script>
