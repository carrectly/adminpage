const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
//var rp = require('request-promise')
var parseMessage = require('gmail-api-parse-message')
var Base64 = require('js-base64').Base64

module.exports = router

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

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
	console.log('fetching output', output)

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
	const query = 'subject:EVE of the EVE and Harris Associates'

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

	//console.log('PARTS', parts)
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

			console.log('Request attachement', Object.keys(request.data))
			obj.filename = part.filename
			obj.attachment = request
			obj.type = part.mimeType
			attachmentsArray.push(obj)
			await imgDecoder(
				request.data.data,
				`/Users/abirkus/Desktop/carrectly/adminpage/server/auth/${part.filename}`
			)
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

	async function imgDecoder(base64str, file) {
		// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
		var bitmap = await Buffer.from(base64str, 'base64')
		fs.writeFileSync(file, bitmap)
	}
}

// /**
//  * Get Attachments from a given Message.
//  *
//  * @param  {String} userId User's email address. The special value 'me'
//  * can be used to indicate the authenticated user.
//  * @param  {String} messageId ID of Message with attachments.
//  * @param  {Function} callback Function to call when the request is complete.
//  */
// function getAttachments(userId, message, callback) {
// 	var parts = message.payload.parts
// 	for (var i = 0; i < parts.length; i++) {
// 		var part = parts[i]
// 		if (part.filename && part.filename.length > 0) {
// 			var attachId = part.body.attachmentId
// 			var request = gapi.client.gmail.users.messages.attachments.get({
// 				id: attachId,
// 				messageId: message.id,
// 				userId: userId,
// 			})
// 			request.execute(function(attachment) {
// 				callback(part.filename, part.mimeType, attachment)
// 			})
// 		}
// 	}
// }
