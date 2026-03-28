import { useRouter } from 'vue-router'
import { useAuthUserStore } from 'stores/auth'
import { EnumLoadingState } from 'src/enums'

export const useAuth = () => {
  const router = useRouter()
  const authStore = useAuthUserStore()

  const handleAuth = async () => {
    await authStore.checkAuthStatus()

    if (authStore.getLoadingState === EnumLoadingState.ERROR) {
      return
    }

    if (authStore.getIsAuthenticated) {
      await authStore.fetchUser()
      await router.push('/')
    } else {
      await router.push('/auth')
    }
  }

  return {
    handleAuth,
    isAuthenticated: authStore.getIsAuthenticated,
    loadingState: authStore.getLoadingState,
  }
}
