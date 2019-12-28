const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
//var rp = require('request-promise')
var parseMessage = require('gmail-api-parse-message')
var Base64 = require('js-base64').Base64

module.exports = router

const SCOPES = [
	'https://www.googleapis.com/auth/gmail.readonly',
	'https://www.googleapis.com/auth/gmail.send',
]

const TOKEN_PATH = '/Users/abirkus/Desktop/carrectly/adminpage/tockengmail.json'

router.get('/', async (req, res, next) => {
	try {
		let result = await fetchEmails()
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/:messageid', async (req, res, next) => {
	try {
		const id = req.params.messageid

		let result = await fetchSingleEmail(id)

		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/send', async (req, res, next) => {
	try {
		const obj = req.body

		let result = await sendSingleEmail(obj)

		res.json(result)
	} catch (err) {
		next(err)
	}
})
async function fetchEmails() {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), listMessages)
	//console.log('fetching output change for each loop', output)

	return output
}

async function fetchSingleEmail(id) {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	//let output = await getMessage(JSON.parse(content), id)
	let output = await authorize(JSON.parse(content), getMessage, id)

	return output
}

async function sendSingleEmail(msg) {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	//let output = await getMessage(JSON.parse(content), id)
	let output = await authorize(JSON.parse(content), sendEmail, msg)

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

	let tkn = await fs.readFileSync(TOKEN_PATH, 'utf8')

	if (!query) {
		if (!tkn) {
			return getNewToken(oAuth2Client, await callback)
		} else {
			tkn = JSON.parse(tkn)
			oAuth2Client.setCredentials(tkn)
			return callback(oAuth2Client)
		}
	} else if (!tkn) {
		return getNewToken(oAuth2Client, await callback, query)
	} else {
		tkn = JSON.parse(tkn)
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
function getNewToken(oAuth2Client, callback, query) {
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
			if (!query) {
				return callback(oAuth2Client)
			} else {
				return callback(oAuth2Client, query)
			}
		})
	})
}

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */

async function listMessages(auth) {
	const userId = 'me'
	//const query = 'subject:lottery'
	//const query = 'subject:poker'
	//const query = 'subject:EVE of the EVE and Harris Associates'
	const query = 'subject:carrectlytest'

	const gmail = await google.gmail({
		version: 'v1',
		auth,
	})

	var initialRequest = await gmail.users.messages.list({
		userId: userId,
		q: query,
	})

	let nextPage = initialRequest.data.nextPageToken

	var loopContinue = true
	let newArr = []
	newArr = [...newArr, ...initialRequest.data.messages]
	async function Managework() {
		while (loopContinue) {
			await doWork(nextPage)
				.then(val => {
					newArr = [...newArr, ...val.data.messages]
					nextPage = val.data.nextPageToken || null
				})
				.catch(reason => {
					console.log('Promise fail')
					loopContinue = false
				})
		}

		let headersArray = []

		await asyncForEach(newArr, async msg => {
			let resp = await gmail.users.messages.get({
				userId: userId,
				id: msg.id,
				format: 'metadata',
				metadataHeaders: ['Subject', 'From', 'Date'],
			})
			let obj = {
				id: msg.id,
			}
			resp.data.payload.headers.forEach(el => {
				obj[el.name] = el.value
			})
			headersArray.push(obj)
		})

		return headersArray
	}

	return Managework()

	function doWork(tkn) {
		return new Promise((resolve, reject) => {
			if (tkn) {
				let request = gmail.users.messages.list({
					userId: userId,
					pageToken: tkn,
					q: query,
				})
				resolve(request)
			} else {
				reject('no more pages')
			}
		})
	}

	async function asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array)
		}
	}
}

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
async function getMessage(auth, messageId) {
	const userId = 'me'

	const gmail = await google.gmail({version: 'v1', auth})

	var response = await gmail.users.messages.get({
		userId: userId,
		id: messageId,
	})

	var parts = response.data.payload.parts
	let decoded = parseMessage(response.data).textPlain
	let attachmentsArray = []

	await asyncForEach(parts, async part => {
		let obj = {}
		if (part.filename && part.filename.length > 0) {
			var attachId = part.body.attachmentId
			var request = await gmail.users.messages.attachments.get({
				id: attachId,
				messageId: messageId,
				userId: userId,
			})

			//console.log('Request attachement', request.data.data.slice(0, 200))
			obj.filename = part.filename
			obj.attachment = request.data.data
			obj.type = part.mimeType
			attachmentsArray.push(obj)
		}
	})

	if (!decoded) {
		return console.log('The API returned an error: ')
	} else {
		return {decoded, attachmentsArray}
	}

	async function asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array)
		}
	}
}

// base64 to buffer conversion... initial tries
// await imgDecoder(
// 	request.data.data,
// 	`/Users/abirkus/Desktop/carrectly/adminpage/server/auth/${part.filename}`
// )

// async function imgDecoder(base64str, file) {
// 	// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
// 	var bitmap = await Buffer.from(base64str, 'base64')
// 	fs.writeFileSync(file, bitmap)
// }

async function sendEmail(auth, msg) {
	const gmail = await google.gmail({
		version: 'v1',
		auth,
	})

	// You can use UTF-8 encoding for the subject using the method below.
	// You can also just use a plain string if you don't need anything fancy.
	const subject = `${msg.orderid} - SERVICE QUOTE REQUEST FOR CARRECTLY`
	//const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`
	const messageParts = [
		'From: Andre Birkus <birkusandre@gmail.com>',
		'To: Andre Birkus <birkusandre@gmail.com>',
		'Content-Type: text/html; charset=utf-8',
		'MIME-Version: 1.0',
		`Subject: ${subject}`,
		'',
		'Hello,<br/>',
		'Your business has been selected to service a vehicle for Carrectly <br/>',
		'Our concierge will drop off the car shortly.',
		'<b>PLEASE REPLY TO THIS EMAIL</b> once you have a quote estimate for the vehicle below:<br/>',
		`Car Make: ${msg.make}<br/>`,
		`Car Model: ${msg.model}<br/>`,
		`Car Year: ${msg.year}<br/>`,
		`VIN: ${msg.year}<br/>`,
		'Thank you for your business,<br/>',
		'TEAM CARRECTLY',
	]
	const message = messageParts.join('\n')

	const encodedMessage = Buffer.from(message)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
	//.replace(/=+$/, '')

	const res = await gmail.users.messages.send({
		userId: 'me',
		requestBody: {
			raw: encodedMessage,
		},
	})
	console.log(res.data)
	return res.data
}
