const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
const {User} = require('../db/models')
const passport = require('passport')
var parseMessage = require('gmail-api-parse-message')
var Base64 = require('js-base64').Base64
const http = require('http')
const url = require('url')
const destroyer = require('server-destroy')
const opn = require('open')
const sampleClient = require('./googleclient')

module.exports = router

const SCOPES = [
	'https://www.googleapis.com/auth/gmail.readonly',
	'https://www.googleapis.com/auth/gmail.send',
	'https://www.googleapis.com/auth/gmail.modify',
	'https://www.googleapis.com/auth/gmail.compose',
]

const TOKEN_PATH = '/Users/abirkus/Desktop/carrectly/adminpage/tockengmail.json'

const gmail = google.gmail({
	version: 'v1',
	auth: sampleClient.oAuth2Client,
})

router.get('/:orderid', async (req, res, next) => {
	try {
		sampleClient
			.authenticate(SCOPES)
			.then(runSample)
			.catch(console.error)

		// let id = req.params.orderid
		// let result = await fetchEmails(id)
		// res.json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/single/:messageid', async (req, res, next) => {
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
async function fetchEmails(id) {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), listMessages, id)

	return output
}

async function fetchSingleEmail(id) {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)

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

	//console.log('CREATING OATH 2 CLIENT', oAuth2Client)
	//let tkn = await fs.readFileSync(TOKEN_PATH, 'utf8')

	let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
	let tkn = JSON.parse(usr.dataValues.gmailToken)

	console.log('TOKEN line 103', tkn)
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
function getNewToken(oAuth2Client, callback, query) {
	// const authUrl = oAuth2Client.generateAuthUrl({
	// 	access_type: 'offline',
	// 	scope: SCOPES,
	// })

	return new Promise((resolve, reject) => {
		// grab the url that will be used for authorization
		const authorizeUrl = this.oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES.join(' '),
		})
		const server = http
			.createServer(async (req, res) => {
				try {
					if (req.url.indexOf('/oauth2callback') > -1) {
						const qs = new url.URL(req.url, 'http://localhost:3000')
							.searchParams
						res.end(
							'Authentication successful! Please return to the console.'
						)
						server.destroy()
						const {tokens} = await this.oAuth2Client.getToken(
							qs.get('code')
						)
						this.oAuth2Client.credentials = tokens
						resolve(this.oAuth2Client)
					}
				} catch (e) {
					reject(e)
				}
			})
			.listen(3000, () => {
				// open the browser to the authorize url to start the workflow
				opn(this.authorizeUrl, {wait: false}).then(cp => cp.unref())
			})
		destroyer(server)

		// console.log('Authorize this app by visiting this url:', authUrl)
		// const rl = readline.createInterface({
		// 	input: process.stdin,
		// 	output: process.stdout,
		// })
		// rl.question('Enter the code from that page here: ', code => {
		// 	rl.close()
		// 	oAuth2Client.getToken(code, async (err, token) => {
		// 		if (err) return console.error('Error retrieving access token', err)
		// 		oAuth2Client.setCredentials(token)
		// 		// Store the token to disk for later program executions
		// 		let str = JSON.stringify(token)

		// 		let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
		// 		await usr.update({gmailToken: str})
		// 		// fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
		// 		// 	if (err) return console.error(err)
		// 		// 	console.log('Token stored to', TOKEN_PATH)
		// 		// })
		// 		if (!query) {
		// 			return callback(oAuth2Client)
		// 		} else {
		// 			return callback(oAuth2Client, query)
		// 		}
		// 	})
		//})
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

async function listMessages(auth, id) {
	const userId = 'me'
	//const query = 'subject:lottery'
	//const query = 'subject:poker'
	//const query = 'subject:EVE of the EVE and Harris Associates'
	const query = `subject:${id}`

	const gmail = await google.gmail({
		version: 'v1',
		auth,
	})

	var initialRequest = await gmail.users.messages.list({
		userId: userId,
		q: query,
	})

	console.log('gmail request using api key', initialRequest)
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
				.catch(err => {
					console.log('Promise fail')
					loopContinue = false
					console.error(err)
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
	if (initialRequest.data.resultSizeEstimate > 0) {
		return Managework()
	} else {
		return []
	}

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

	var parts = response.data.payload.parts || []
	//let decoded = await parseMessage(response.data.payload.body).textPlain
	let decoded = await parseMessage(response.data)

	decoded = decoded.textHtml || decoded.textPlain

	let attachmentsArray = []

	if (parts.length > 0) {
		await asyncForEach(parts, async part => {
			let obj = {}
			if (part.filename && part.filename.length > 0) {
				var attachId = part.body.attachmentId
				var request = await gmail.users.messages.attachments.get({
					id: attachId,
					messageId: messageId,
					userId: userId,
				})

				obj.filename = part.filename
				obj.attachment = request.data.data
				obj.type = part.mimeType
				attachmentsArray.push(obj)
			}
		})
	}

	if (!decoded) {
		return console.log(
			'The API returned an error inside single message fetch'
		)
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
		`To: ${msg.email}`,
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
		`VIN: ${msg.vin}<br/>`,
		'Thank you for your business,<br/>',
		'TEAM CARRECTLY',
	]
	const message = messageParts.join('\n')

	const encodedMessage = Buffer.from(message)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
	//.replace(/=+$/, '')

	//function to send the message
	// const res = await gmail.users.messages.send({
	// 	userId: 'me',
	// 	requestBody: {
	// 		raw: encodedMessage,
	// 	},
	// })

	// create a draft
	const res = await gmail.users.drafts.create({
		userId: 'me',
		resource: {
			message: {
				raw: encodedMessage,
			},
		},
	})

	return res.data
}

async function runSample() {
	console.log('RUNNING SAMPLE')
	const res = await gmail.users.drafts.list({userId: 'me'})
	console.log('DRAFTS', res.data)
	return res.data
}
