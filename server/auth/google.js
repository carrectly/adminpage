const passport = require('passport')
const fs = require('fs')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const {google} = require('googleapis')
const readline = require('readline')
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

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
const TOKEN_PATH = '/Users/abirkus/Desktop/carrectly/adminpage/tocken.json'

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
			//const name = profile.displayName
			const email = profile.emails[0].value

			User.findOrCreate({
				where: {googleId},
				defaults: {email},
			})
				.then(([user]) => done(null, user))
				.catch(done)
		}
	)

	passport.use(strategy)

	router.get('/', passport.authenticate('google', {scope: 'email'}))

	router.get(
		'/callback',
		passport.authenticate('google', {
			successRedirect: '/home',
			failureRedirect: '/login',
		})
	)
}

router.get('/gmail', async (req, res, next) => {
	try {
		let result = await runGmailApi()
		console.log(result)
		res.json(result)
	} catch (err) {
		next(err)
	}
})

async function runGmailApi() {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), await listLabels)
	return output
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	)

	const tkn = await JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))

	if (!tkn) {
		return getNewToken(oAuth2Client, await callback)
	} else {
		oAuth2Client.setCredentials(tkn)
		return callback(oAuth2Client)
	}
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	})
	console.log('Authorize this app by visiting this url:', authUrl)
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	rl.question('Enter the code from that page here: ', code => {
		rl.close()
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err)
			oAuth2Client.setCredentials(token)
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
				if (err) return console.error(err)
				console.log('Token stored to', TOKEN_PATH)
			})

			return callback(oAuth2Client)
		})
	})
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
	const gmail = await google.gmail({version: 'v1', auth})
	let response = await gmail.users.labels.list(
		{
			userId: 'me',
		},
		'utf8'
	)

	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data.labels
	}
}
