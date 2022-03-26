const router = require('express').Router()
const moment = require('moment')
const { calendar } = require('./oAuth2Client')
module.exports = router

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
  let attendeeEmail = evt.pickUpDriverEmail
  let color = 11
  let startTime = evt.pickupDate
  if (Object.prototype.hasOwnProperty.call(evt, 'returnDriverEmail')) {
    attendeeEmail = evt.returnDriverEmail
    color = 10
    startTime = evt.dropoffDate
  }

  const endTime = moment(startTime).add(1, 'hour')
  const endTimeISO = endTime.toISOString()

  var event = {
    summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
    location: `${evt.pickupLocation}`,
    description: `Customer phone number: ${evt.customerPhoneNumber}
		OrderID: ${evt.hash}
		${evt.comments ? evt.comments : ''}`,
    start: {
      dateTime: `${startTime}`,
      timeZone: 'America/Chicago',
    },
    end: {
      dateTime: `${endTimeISO}`,
      timeZone: 'America/Chicago',
    },
    colorId: color,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
    attendees: [{ email: attendeeEmail }],
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

  var event = {
    summary: `${evt.carYear} ${evt.carMake} ${evt.carModel} ${evt.customerName}`,
    location: `${evt.pickupLocation}`,
    id: `${evt.hash}`,
    description: `Customer phone number: ${evt.customerPhoneNumber}
		Customer name: ${evt.customerName}
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
