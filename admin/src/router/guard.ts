import { Router } from 'vue-router'
import { useAuthUserStore } from '../stores/auth'

export const applyRouterGuard = ( router: Router ) => {
  router.beforeEach( async ( to, from, next ) => {
    const authStore = useAuthUserStore()

    if ( ! authStore.isAuthenticated ) {
      await authStore.checkAuthStatus()
    }

    if ( to.path === '/' ) {
      return next( { name: 'login' } )
    }

    if ( to.query.login === 'success' && authStore.getIsAuthenticated ) {
      return next( { name: 'brands' } ) // Redirect to your actual dashboard start
    }

    if ( to.query.login === 'denied' ) {
      return next( { name: 'login', query: { error: 'denied' } } )
    }

    const requiresAuth = to.matched.some( record => record.meta.requiresAuth )

    if ( requiresAuth && ! authStore.getIsAuthenticated ) {
      return next( { name: 'login' } )
    }

    if ( to.name === 'login' && authStore.getIsAuthenticated ) {
      return next( { name: 'brands' } )
    }

    next()
  } )
}
