<script lang="ts" setup>
import { rerouteIfNotSignedIn } from 'src/composables/rerouteIfNotSignedIn'
import { useAuthUserStore } from 'stores/auth'
import { onMounted } from 'vue'

onMounted( async () => {
  await rerouteIfNotSignedIn()
} )

const { hasError, isLoading } = useAuthUserStore()
</script>

<template>
  <q-page class="flex flex-center full-height full-width">

    <div v-if="isLoading" class="text-center">
      <q-spinner color="primary" size="50px"/>
      <p class="q-mt-md text-grey-7">Completing sign in...</p>
    </div>

    <div v-else-if="hasError" class="text-center">
      <q-icon color="negative" name="error" size="50px"/>
      <p class="q-mt-md text-negative">Authentication failed. Please try again.</p>
      <q-btn class="q-mt-md" color="primary" label="Back to Login" no-caps to="/auth" unelevated/>
    </div>

  </q-page>
</template>
