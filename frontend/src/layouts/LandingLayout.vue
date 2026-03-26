<script lang="ts" setup>
import AppFooter from './components/landing/AppFooter.vue'
import AppHeader from './components/landing/AppHeader.vue'
</script>

<template>
  <q-layout>
    <q-page-container>
      <AppHeader/>
      <router-view/>
      <AppFooter/>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass" scoped>
</style>
