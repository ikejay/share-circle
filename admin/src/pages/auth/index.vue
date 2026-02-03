<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2" style="width: 350px">
      <q-card-section class="text-center">
        <div class="text-h6 q-mb-md">Welcome</div>
        <p class="text-caption text-grey-7">Sign in to continue</p>
      </q-card-section>

      <q-card-section class="flex justify-center">
        <q-btn @click="onGoogleAuth">Continue With Google</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../../stores/user'

export default defineComponent( {
  computed: {
    UserStore() {
      return useUserStore()
    },
  },
  methods: {
    onGoogleAuth() {
      window.location.href = 'http://localhost:3000/api/auth/google'
    },
  },
} )
</script>
