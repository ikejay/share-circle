import passport from 'passport'
import { User } from '../business-objects/user'
import { initGoogleStrategy } from './google'

export const InitIdentityProviders = () => {
  initGoogleStrategy()

  passport.serializeUser( async ( user: any, done ) => {
    done( null, user.id )
  } )

  passport.deserializeUser( async ( id: string, done ) => {
    try {
      const user = await User.getById( id )
      done( null, user )
    } catch ( e ) {
      done( e )
    }
  } )
}
