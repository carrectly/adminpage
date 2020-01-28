const router = require('express').Router()
const {google} = require('googleapis')
const sampleClient = require('./googleclient')

module.exports = router

const people = google.people({
	version: 'v1',
	auth: sampleClient.oAuth2Client,
})

router.get('/', async (req, res, next) => {
	try {
		await sampleClient.authenticate()
		let result = await listConnectionNames()
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		await sampleClient.authenticate()
		let newcontact = req.body
		let result = await addNewContact(newcontact)
		res.json(result)
	} catch (err) {
		next(err)
	}
})

/**
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listConnectionNames() {
	//const service = await google.people({version: 'v1', auth})
	const response = await people.people.connections.list({
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

async function addNewContact(obj) {
	//console.log('INSIDE CONTACTS API', obj)
	//const service = await google.people({version: 'v1', auth})

	const response = await people.people.createContact({
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
