const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const email = profile.emails[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName
      let role = 'unconfirmed'

      if (email === 'info@carrectly.com') {
        role = 'admin'
      }

      User.findOrCreate({
        where: { googleId },
        defaults: { email, firstName, lastName, role },
      })
        .then((user) => {
          return done(null, user[0])
        })
        .catch(done)
    }
  )

  passport.use(strategy)

  //  when obtaining the refresh token, need to enable other scopes
  const SCOPES = [
    'email',
    'profile',
    // 'https://mail.google.com/',
    // 'https://www.googleapis.com/auth/contacts',
    // 'https://www.googleapis.com/auth/calendar',
  ]
  // accessType will need to be enabled if we are trying to obtain new refresh token
  router.get(
    '/',
    passport.authenticate('google', {
      scope: SCOPES,
      // accessType: 'offline',
      // prompt: 'consent',
    })
  )

  router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/account')
    }
  )
}

router.use('/gmail', require('./gmail'))
router.use('/calendar', require('./calendar'))
router.use('/contacts', require('./contacts'))
