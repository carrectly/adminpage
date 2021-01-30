const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */
//process.env.client_id, process.env.client_secret, process.env.redirect_uris

// clientID: process.env.client_id,
// clientSecret: process.env.client_secret,

// 				clientID: process.env.GOOGLE_CLIENT_ID,
// clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// callbackURL: process.env.GOOGLE_CALLBACK,

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

			// let tkn = {}

			// if (token) {
			// 	tkn.access_token = token
			// }
			// if (refreshToken) {
			// 	tkn.refresh_token = refreshToken
			// }
			// tkn = JSON.stringify(tkn)

			User.findOrCreate({
				where: {googleId},
				defaults: {email},
			})
				.then(user => {
					// if (user[0]._options.isNewRecord) {
					// 	user[0].update({token: tkn})
					// }
					return done(null, user[0])
				})
				.catch(done)
		}
	)

	passport.use(strategy)

	const SCOPES = [
		'email',
		'https://www.googleapis.com/auth/gmail.readonly',
		'https://www.googleapis.com/auth/gmail.send',
		'https://www.googleapis.com/auth/gmail.modify',
		'https://www.googleapis.com/auth/gmail.compose',
		'https://www.googleapis.com/auth/contacts',
		'https://www.googleapis.com/auth/calendar',
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
		passport.authenticate('google', {failureRedirect: '/login'}),
		function(req, res) {
			res.redirect('/account')
		}
	)
}

router.use('/gmail', require('./gmail'))
router.use('/calendar', require('./calendar'))
router.use('/contacts', require('./contacts'))
