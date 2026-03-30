import { useAuthUserStore } from 'stores/auth'
import { useRouter } from 'vue-router'

export const rerouteIfNotSignedIn = async () => {
  const router = useRouter()
  const authStore = useAuthUserStore()

  await authStore.checkAuthStatus()

  if ( authStore.isAuthenticated ) {
    await authStore.fetchUser()
    await router.push( { name: 'Dashboard' } )
  } else {
    await router.push( { name: 'Authentication' } )
  }
}
