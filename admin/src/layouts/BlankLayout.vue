<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  name: 'BlankLayout',
} )
</script>


<style lang="sass" scoped>

</style>
