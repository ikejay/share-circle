import passport from 'passport'
import { Strategy as GoogleStrategy, StrategyOptions } from 'passport-google-oauth20'
import process from 'process'
import { EnumContactType, EnumUserStatus } from '../../../types-and-enums/enums'
import { User } from '../../business-objects/user'

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
    if ( ! profile.emails || profile.emails.length === 0 ) {
      done( new Error( 'Identity provider did not supply an email address' ), false )
      return
    }

    try {
      // Look up user by social account first
      let user = await User.getBySocialAccount( 'google', profile.id )

      if ( ! user ) {
        // Fall back to email match (e.g. user registered another way)
        const email = profile.emails[ 0 ].value
        user = await User.getByContact( { type: EnumContactType.EMAIL, value: email } )

        if ( user ) {
          // Link the Google account to the existing user
          await User.upsertSocialAccount( user.id, 'google', profile.id, accessToken, refreshToken )

        } else {
          // Create a new user
          const displayName = profile.displayName || `${ profile._json.given_name || '' } ${ profile._json.family_name || '' }`.trim() || email

          user = await User.create( {
            displayName,
            contacts: [
              ...profile.emails.map( email => ( { type: EnumContactType.EMAIL, value: email } ) ),
            ],
            avatarUrl: profile._json.picture ?? null,
            status: EnumUserStatus.ACTIVE,
          } )

          await User.upsertSocialAccount( user.id, 'google', profile.id, accessToken, refreshToken )
        }
      } else {
        // Refresh tokens on existing social account
        await User.upsertSocialAccount( user.id, 'google', profile.id, accessToken, refreshToken )
      }

      await User.updateLatestLoggedIn( user.id )
      done( null, user )

    } catch ( e ) {
      console.error( e )
      done( e as Error, false )

    }
  } ) )
}
