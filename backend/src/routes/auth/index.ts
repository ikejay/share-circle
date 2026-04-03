import type { Request, Response } from 'express'
import { Router } from 'express'
import passport from 'passport'
import { IUser } from '../../types'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:9000'

const googleAuth = passport.authenticate( 'google', {
  scope: [ 'profile', 'email' ],
} )

const googleAuthCallbackCheck = passport.authenticate( 'google', {
  failureRedirect: `${ FRONTEND_URL }/?error=auth_failed`,
  successRedirect: `${ FRONTEND_URL }/auth/callback`,
  session: true,
} )

const logout = ( req: Request, res: Response ) => {
  req.logout( ( error ) => {
    if ( error ) {
      console.error( 'Logout error:', error )
    }

    req.session.destroy( ( error ) => {
      if ( error ) {
        console.error( 'Session destruction error', error )
      }
      res.clearCookie( 'connect.sid' )
      res.redirect( `${ FRONTEND_URL }/` )
    } )
  } )
}

const getCurrentUser = ( req: Request, res: Response ) => {
  if ( req.isAuthenticated() ) {
    const user = req.user as IUser
    res.json( user )
  } else {
    res.status( 401 ).json( { error: 'Not authenticated' } )
  }
}

const checkAuth = ( req: Request, res: Response ) => {
  res.json( { isAuthenticated: req.isAuthenticated() } )
}

export const authRoutes = Router()
  .get( '/google', googleAuth )
  .get( '/google/callback', googleAuthCallbackCheck )
  .get( '/logout', logout )
  .get( '/who-am-i', getCurrentUser )
  .get( '/check', checkAuth )
