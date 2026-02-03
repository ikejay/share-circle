import passport from 'passport'
import { Strategy as GoogleStrategy, StrategyOptions } from 'passport-google-oauth20'
import process from 'process'
import { EnumUserStatus } from '../../../types-and-enums/enums'
import { User } from '../../business-objects/user'
import { IRecordUser } from '../../types'


export const initGoogleStrategy = () => {
  const {
    HOST_NAME,
    PORT,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  } = process.env


  const callBackURL = `http://${ HOST_NAME }:${ PORT }/api/auth/google/callback`

  const strategyOptions: StrategyOptions = {
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: callBackURL,
  }

  passport.use( new GoogleStrategy( strategyOptions, async (
    accessToken,
    refreshToken,
    profile,
    done,
  ) => {
    if ( ! profile.emails ) {
      done( new Error( 'identity provider did not provide any email address of this user' ), false )
      return
    }

    let user: IRecordUser | null

    // check if user exists, or create one

    try {
      console.log( 'ACCESS TOKEN', accessToken )
      console.log( 'REFRESH TOKEN', refreshToken )
      console.log( 'Profile', profile )

      user = await User.getAccountDetails( profile.id )

      if ( ! user ) {
        const users = await User.getAll()
        const isTheFirstUser = users.length === 0

        user = await User.create( {
          accountId: profile.id,
          identityProviderId: 1,
          firstName: profile._json.given_name || '',
          lastName: profile._json.family_name || '',
          postalAddressId: null,
          email: profile._json.email || '',
          phone: null,
          status: isTheFirstUser ? EnumUserStatus.VERIFIED : EnumUserStatus.UNVERIFIED,
          isAdmin: isTheFirstUser,
        } )
      }

      done( null, user ?? profile )
    } catch ( e ) {
      console.error( e )
      done( e as Error, false )
    }
  } ) )

}
