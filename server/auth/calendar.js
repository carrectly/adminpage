const router = require('express').Router()
const {google} = require('googleapis')
const sampleClient = require('./googleclient')
const {User} = require('../db/models')

module.exports = router

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_CALLBACK
)

const calendar = google.calendar({
	version: 'v3',
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
		let result = await listEvents()
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/newevent', async (req, res, next) => {
	try {
		const obj = req.body
		const result = await createEvent(obj)
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/newevent/update', async (req, res, next) => {
	try {
		const obj = req.body
		const result = await updateEvent(obj)
		res.json(result)
	} catch (err) {
		next(err)
	}
})

async function listEvents() {
	let response = await calendar.events.list(
		{
			calendarId: 'primary',
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime',
		},
		'utf8'
	)
	if (!response) {
		return console.log('The API returned an error: ')
	} else {
		return response.data.items
	}
}

async function createEvent(evt) {
	var event = {
		summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
		location: `${evt.pickupLocation}`,
		id: `${evt.hash}`,
		description: `Customer phone number: ${evt.customerPhoneNumber} \n ${evt.comments}`,
		start: {
			dateTime: `${evt.pickupDate}`,
			timeZone: 'America/Chicago',
		},
		end: {
			dateTime: `${evt.dropoffDate}`,
			timeZone: 'America/Chicago',
		},
		colorId: '11',
		reminders: {
			useDefault: false,
			overrides: [
				{method: 'email', minutes: 24 * 60},
				{method: 'popup', minutes: 10},
			],
		},
	}

	//flexible calendar id '6kllmvnusibcs0lbnh98ffiqvs@group.calendar.google.com'
	var request = await calendar.events.insert({
		calendarId: 'primary',
		resource: event,
	})

	if (!request) {
		return console.log('The API returned an error: ')
	} else {
		return request.data
	}
}

async function updateEvent(auth, evt) {
	// let allcalendars = await calendar.calendarList.list()
	// console.log('all calendar ids', allcalendars.data.items)

	//flexibleid = 6kllmvnusibcs0lbnh98ffiqvs@group.calendar.google.com
	let colorid = 11
	if (evt.status === 'waiting on quote') {
		colorid = 4
	} else if (evt.status === 'quote approved - getting serviced') {
		colorid = 5
	} else if (evt.status === 'completed - pending invoice') {
		colorid = 10
	} else if (evt.status === 'completed - invoice sent') {
		colorid = 2
	} else if (evt.status === 'completed - paid') {
		colorid = 8
	}

	console.log('event received from new booking', evt)
	var event = {
		summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
		location: `${evt.pickupLocation}`,
		id: `${evt.hash}`,
		description: `Customer phone number: ${evt.customerPhoneNumber} \n ${evt.comments}`,
		start: {
			dateTime: `${evt.pickupDate}`,
			timeZone: 'America/Chicago',
		},
		end: {
			dateTime: `${evt.dropoffDate}`,
			timeZone: 'America/Chicago',
		},
		colorId: `${colorid}`,
		reminders: {
			useDefault: false,
			overrides: [
				{
					method: 'email',
					minutes: 24 * 60,
				},
				{
					method: 'popup',
					minutes: 10,
				},
			],
		},
	}

	var request = await calendar.events.update({
		calendarId: 'primary',
		eventId: evt.hash,
		resource: event,
	})

	if (!request) {
		return console.log('The API returned an error: ')
	} else {
		return request.data
	}
}
