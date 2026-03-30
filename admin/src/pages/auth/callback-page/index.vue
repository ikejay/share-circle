<template>
  <q-page class="flex full-width full-height flex-center">
    <div v-if="loading" class="text-center">
      <q-spinner color="primary" size="50px"/>
      <p class="q-mt-md">Completing sign in...</p>
    </div>
    <div v-else-if="error" class="text-center">
      <q-icon color="negative" name="error" size="50px"/>
      <p class="q-mt-md text-negative">{{ error }}</p>
      <q-btn class="q-mt-md" label="Go Back to Login" to="/auth"/>
      <pre>{{ user }}</pre>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EnumLoadingState } from '../../../enums'
import { useAuthUserStore } from '../../../stores/auth'
import { IUser } from '../../../types'

type IData = {
  loading: EnumLoadingState,
  user: IUser | null,
  error: string,
  timer: any
}

export default defineComponent( {
  computed: {
    AuthStore() {
      return useAuthUserStore()
    },
    user() {
      return useAuthUserStore().user
    },
  },

  data(): IData {
    return {
      loading: EnumLoadingState.INITIAL,
      user: null,
      timer: null,
      error: '',
    }
  },

  methods: {
    async handleAuth() {
      console.log( 'dajsmodiamsidovailjsdio' )
      this.loading = this.AuthStore.loadingState
      try {
        await this.AuthStore.checkAuthStatus()

        console.log( 'This /////', this.AuthStore.checkAuthStatus() )

        if ( ! this.AuthStore.getIsAuthenticated ) {
          throw new Error( 'User Authentication Process Not Complete' )
        }

        this.$q.notify( {
          type: 'positive',
          message: 'Successfully Signed In',
          timeout: 2000,
        } )

        await this.AuthStore.fetchUserData()

        this.$router.push( '/products' )

      } catch ( err: any ) {
        this.error = err.message
        this.$q.notify( {
          type: 'negative',
          message: this.error,
        } )
      } finally {
        this.loading = false
      }
    },

  },
  mounted() {
    this.handleAuth()
  },
} )
</script>

<style lang="sass" scoped>

</style>
