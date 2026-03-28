<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthUserStore } from 'stores/auth'
import { useAuth } from 'src/composables/useAuth'
import { EnumLoadingState } from 'src/enums'

const authStore = useAuthUserStore()
const { handleAuth } = useAuth()

onMounted(async () => {
  await handleAuth()
})
</script>

<template>
  <q-page class="flex flex-center full-height full-width">

    <div v-if="authStore.getLoadingState === EnumLoadingState.LOADING" class="text-center">
      <q-spinner color="primary" size="50px" />
      <p class="q-mt-md text-grey-7">Completing sign in...</p>
    </div>

    <div v-else-if="authStore.getLoadingState === EnumLoadingState.ERROR" class="text-center">
      <q-icon color="negative" name="error" size="50px" />
      <p class="q-mt-md text-negative">Authentication failed. Please try again.</p>
      <q-btn class="q-mt-md" color="primary" label="Back to Login" no-caps unelevated to="/auth" />
    </div>

  </q-page>
</template>
