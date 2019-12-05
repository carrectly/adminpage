const fs = require('fs')
const router = require('express').Router()
const {google} = require('googleapis')
const readline = require('readline')
module.exports = router

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

const TOKEN_PATH = '/Users/abirkus/Desktop/carrectly/adminpage/tockengmail.json'

// router.get('/', async (req, res, next) => {
// 	try {
// 		console.log('AXIOS RECEIVED')
// 		let result = await runGmailApi()
// 		//console.log(result)
// 		res.json(result)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.get('/lottery', async (req, res, next) => {
	try {
		console.log('AXIOS RECEIVED')
		let result = await fetchLottery()
		//console.log(result)
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

async function fetchLottery() {
	const content = await fs.readFileSync(
		'/Users/abirkus/Desktop/carrectly/adminpage/secretsgmail.json',
		'utf8'
	)
	let output = await authorize(JSON.parse(content), await listMessages)
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

// function listLabels(userId, callback) {
// 	var request = gapi.client.gmail.users.labels.list({
// 		userId: userId,
// 	})
// 	request.execute(function(resp) {
// 		var labels = resp.labels
// 		callback(labels)
// 	})
// }

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
	const query = 'subject:lottery'
	let arr = []
	const callback = inpt => {
		arr.push(inpt)
	}

	const gmail = await google.gmail({version: 'v1', auth})

	var initialRequest = await gmail.users.messages.list({
		userId: userId,
		q: query,
	})

	console.log('initial Request first message', initialRequest)

	let nextPage = initialRequest.data.nextPageToken
	console.log('next page token', nextPage)
	// while (nextPage) {
	// 	let request = await gmail.users.messages.list({
	// 		userId: userId,
	// 		pageToken: nextPage,
	// 		q: query,
	// 	})
	// 	console.log('REQUEST', request)
	// 	ourArray = ourArray.concat(request.data)
	// 	nextPage = request.data.nextPageToken
	// }

	var loopContinue = true
	let newArr = []
	newArr = [...newArr, ...initialRequest.data.messages]
	let counter = 0
	async function Managework() {
		while (loopContinue) {
			//seemingly an infinite loop
			//await (doWork(n));
			counter++
			await doWork(nextPage)
				.then(val => {
					newArr = [...newArr, ...val.data.messages]
					nextPage = val.data.nextPageToken || null
				})
				.catch(reason => {
					console.log('Promise fail')
					loopContinue = false
				})
			console.log('Each loop iteration', counter)
		}
		console.log('all lottery pages', newArr.length)
	}

	Managework()

	function doWork(tkn) {
		return new Promise((resolve, reject) => {
			console.log('Promise req received')
			if (tkn) {
				console.log('inside promise if statement')
				let request = gmail.users.messages.list({
					userId: userId,
					pageToken: tkn,
					q: query,
				})
				//nextPage = request.data.nextPageToken
				console.log('new page token', nextPage)
				console.log('request data inside promise', request.data)
				//resolve(request.data.messages)
				resolve(request)
			} else {
				reject('no more pages')
			}
		})
	}

	//console.log('LOTTERY RESPONSE', ourArray)
	// var getPageOfMessages = (request, result) => {
	// 	request(function(resp) {
	// 		result = result.concat(resp.messages)
	// 		var nextPageToken = resp.nextPageToken
	// 		if (nextPageToken) {
	// 			request = gmail.users.messages.list({
	// 				userId: userId,
	// 				pageToken: nextPageToken,
	// 				q: query,
	// 			})
	// 			getPageOfMessages(request, result)
	// 		} else {
	// 			callback(result)
	// 		}
	// 	})
	// }

	// const innerCallback = resp => {
	// 	result = result.concat(resp.messages)
	// 	var nextPageToken = resp.nextPageToken
	// 	if (nextPageToken) {
	// 		request = gmail.users.messages.list({
	// 			userId: userId,
	// 			pageToken: nextPageToken,
	// 			q: query,
	// 		})
	// 		getPageOfMessages(request, result)
	// 	} else {
	// 		callback(result)
	// 	}
	// }

	// var getPageOfMessages = (request, result) => {
	// 	request.execute(function(resp) {
	// 		result = result.concat(resp.messages)
	// 		var nextPageToken = resp.nextPageToken
	// 		if (nextPageToken) {
	// 			request = gmail.users.messages.list({
	// 				userId: userId,
	// 				pageToken: nextPageToken,
	// 				q: query,
	// 			})
	// 			getPageOfMessages(request, result)
	// 		} else {
	// 			callback(result)
	// 		}
	// 	})
	// }

	//getPageOfMessages(initialRequest, [])
}

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
// function getMessage(userId, messageId, callback) {
// 	var request = gapi.client.gmail.users.messages.get({
// 		userId: userId,
// 		id: messageId,
// 	})
// 	request.execute(callback)
// }
