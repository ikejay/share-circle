import { displayMessage } from 'src/composables/display-message'
import { signedInEvent } from 'src/events/EventReceiver'
import { useAuthUserStore } from '../stores/auth'
import { Router } from 'vue-router'

export const applyRouterGuard = ( router: Router ) => {
  const AuthUserStore = useAuthUserStore()

  const HomePage = { name: 'Home' }

  router.beforeEach( async ( to, from, next ) => {
    const { isInInitialState } = AuthUserStore

    if ( isInInitialState ) {
      await AuthUserStore.whoAmIAction()
    }


    if ( to.name === 'root' ) {
      return next( { name: 'Home' } )
    }

    if ( to && to.query[ 'login' ] === 'success' && AuthUserStore.isSingedIn ) {
      await signedInEvent()
      const { isAdmin } = AuthUserStore

      const pageAfterSignIn = isAdmin
        ? { name: 'Dashboard' }
        : { name: 'Login' }

      console.log( pageAfterSignIn )

      return next( pageAfterSignIn )
    }

    if ( to && to.query[ 'login' ] === 'denied' && ! AuthUserStore.isSingedIn ) {
      return next( { name: 'signInDenied' } )
    }

    if ( to.matched.length === 0 ) {
      displayMessage(
        'Diese Route existiert nicht!',
        '',
      )

      return next( HomePage )

    } else if ( to.matched.some( ( { meta } ) => meta.requiresAuth ) && ! AuthUserStore.isSingedIn ) {
      return next( { name: 'Home' } )

    } else {
      return next()
    }
  } )
}
