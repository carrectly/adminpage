const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
const {User} = require('../db/models')
module.exports = router

const SCOPES = ['https://www.googleapis.com/auth/contacts']

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

router.post('/', async (req, res, next) => {
	try {
		console.log('POST REQ RECEIVED')
		// let newcontact = {
		// 	email: 'Timothy10@hotmail.com',
		// 	location: '7826 Gusikowski Glen',
		// 	firstName: 'Alanna',
		// 	lastName: 'Jerde',
		// 	phoneNumber: '(381) 965-9345',
		// }
		console.log('REQUEST', req.body)
		let newcontact = req.body
		let result = await createContactsApi(newcontact)

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

async function createContactsApi(obj) {
	console.log('create API is called')
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), addNewContact, obj)
	return output
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback, query) {
	const {client_secret, client_id, redirect_uris} = credentials.installed
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	)

	//let tkn = await fs.readFileSync(TOKEN_PATH, 'utf8')

	let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
	let tkn = JSON.parse(usr.dataValues.contactsToken)

	console.log('TOKEN line 80', tkn)

	if (!query) {
		if (!tkn) {
			return getNewToken(oAuth2Client, await callback)
		} else {
			//tkn = JSON.parse(tkn)
			oAuth2Client.setCredentials(tkn)
			return callback(oAuth2Client)
		}
	} else if (!tkn) {
		return getNewToken(oAuth2Client, await callback, query)
	} else {
		//tkn = JSON.parse(tkn)
		oAuth2Client.setCredentials(tkn)
		return callback(oAuth2Client, query)
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
		oAuth2Client.getToken(code, async (err, token) => {
			if (err) return console.error('Error retrieving access token', err)
			oAuth2Client.setCredentials(token)
			// Store the token to disk for later program executions

			let str = JSON.stringify(token)

			let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
			await usr.update({contactsToken: str})

			// fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
			// 	if (err) return console.error(err)
			// 	console.log('Token stored to', TOKEN_PATH)
			// })

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
	const response = await service.people.connections.list({
		resourceName: 'people/me',
		pageSize: 2000,
		sortOrder: 'FIRST_NAME_ASCENDING',
		personFields: 'names,emailAddresses,phoneNumbers',
	})

	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data.connections
	}
}

async function addNewContact(auth, obj) {
	console.log('INSIDE CONTACTS API', obj)
	const service = await google.people({version: 'v1', auth})

	const response = await service.people.createContact({
		requestBody: {
			emailAddresses: [{value: obj.email}],
			phoneNumbers: [
				{
					value: obj.phoneNumber,
					type: 'mobile',
					formattedType: 'Mobile',
				},
			],
			names: [
				{
					displayName: obj.firstName + ' ' + obj.lastName,
					familyName: obj.lastName,
					givenName: obj.firstName,
				},
			],
		},
	})

	console.log('AWAITING CREATION FROM GOOGLE CONTACTS')
	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data.connections
	}
}
