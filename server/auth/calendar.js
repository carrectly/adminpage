const router = require('express').Router()
const {google} = require('googleapis')
const {User} = require('../db/models')
const moment = require('moment')
const oAuth2Client = require('./oAuth2Client')
module.exports = router

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
		console.log('calendarr api req', req.body)
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
	const endTime = moment(evt.pickupDate).add(1, 'hour')
	const endTimeISO = endTime.toISOString()
	var event = {
		summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
		location: `${evt.pickupLocation}`,
		id: `${evt.hash}`,
		description: `Customer phone number: ${evt.customerPhoneNumber} 
		OrderID: ${evt.hash}
		${evt.comments ? evt.comments : ''}`,
		start: {
			dateTime: `${evt.pickupDate}`,
			timeZone: 'America/Chicago',
		},
		end: {
			dateTime: `${endTimeISO}`,
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

async function updateEvent(evt) {
	const endTime = moment(evt.pickupDate).add(1, 'hour')
	const endTimeISO = endTime.toISOString()
	// let allcalendars = await calendar.calendarList.list()
	// console.log('all calendar ids', allcalendars.data.items)
	const statuses = [
		'booked',
		'quote',
		'quoted',
		'in process',
		'returned',
		'invoiced',
		'done',
		'cancelled',
	]
	//flexibleid = 6kllmvnusibcs0lbnh98ffiqvs@group.calendar.google.com

	let colorId = evt.status === statuses[0] ? 11 : statuses.indexOf(evt.status)

	console.log('event received from new booking', evt)
	var event = {
		summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
		location: `${evt.pickupLocation}`,
		id: `${evt.hash}`,
		description: `Customer phone number: ${evt.customerPhoneNumber} 
		OrderID: ${evt.hash}
		${evt.comments ? evt.comments : ''}`,
		start: {
			dateTime: `${evt.pickupDate}`,
			timeZone: 'America/Chicago',
		},
		end: {
			dateTime: `${endTimeISO}`,
			timeZone: 'America/Chicago',
		},
		colorId: `${colorId}`,
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
