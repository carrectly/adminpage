const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
module.exports = router

const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly']

const TOKEN_PATH =
	'/Users/abirkus/Desktop/carrectly/adminpage/tockencontacts.json'

router.get('/', async (req, res, next) => {
	try {
		let result = await runContactsApi()
		//console.log(result)
		res.json(result)
	} catch (err) {
		next(err)
	}
})

async function runContactsApi() {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), await listConnectionNames)
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

	let tkn = await fs.readFileSync(TOKEN_PATH, 'utf8')

	if (!tkn) {
		return getNewToken(oAuth2Client, await callback)
	} else {
		tkn = JSON.parse(tkn)
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
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listConnectionNames(auth) {
	const service = await google.people({version: 'v1', auth})
	const response = await service.people.connections.list(
		{
			resourceName: 'people/me',
			pageSize: 10,
			personFields: 'names,emailAddresses',
		},
		'utf8'
	)

	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data.connections
	}
}
