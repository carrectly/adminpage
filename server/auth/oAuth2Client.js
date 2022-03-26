const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK
)

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const people = google.people({
  version: 'v1',
  auth: oAuth2Client,
})

const calendar = google.calendar({
  version: 'v3',
  auth: oAuth2Client,
})

const gmail = google.gmail({
  version: 'v1',
  auth: oAuth2Client,
})

module.exports = { oAuth2Client, people, calendar, gmail }
