<template>
  <q-layout>
    <q-page-container>
      <AppHeader/>
      <router-view/>
    </q-page-container>
  </q-layout>

</template>

<script lang="ts" setup>
import AppHeader from './components/main/AppHeader.vue'
</script>
