const router = require('express').Router()
const {google} = require('googleapis')
const {User} = require('../db/models')
const oAuth2Client = require('./oAuth2Client')
module.exports = router

const people = google.people({
	version: 'v1',
	auth: oAuth2Client,
})

router.all('*', async (req, res, next) => {
	try {
		let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
		oAuth2Client.setCredentials(JSON.parse(usr.dataValues.token))
		next()
	} catch (err) {
		next(err)
	}
})

router.get('/', async (req, res, next) => {
	try {
		let result = await listConnectionNames()
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
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

	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data
	}
}
