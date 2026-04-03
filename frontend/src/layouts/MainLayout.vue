<template>
  <q-layout>
    <q-page-container>
      <AppHeader/>
      <router-view/>
    </q-page-container>
  </q-layout>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import AppHeader from './components/main/AppHeader.vue'
import { useAuthUserStore } from 'stores/auth'

const authStore = useAuthUserStore()

onMounted( async () => {
  if ( !authStore.user ) {
    await authStore.fetchUser()
  }
} )
</script>
