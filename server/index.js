const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

// logging middleware
// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test'
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api')) // include our routes!

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack)
	res.status(err.status || 500).send(err.message || 'Internal server error')
})

const {db} = require('./db')
//const app = require('./server')
const PORT = 1337

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
	.then(() => {
		console.log('db synced')
		app.listen(PORT, () =>
			console.log(`studiously serving silly sounds on port ${PORT}`)
		)
	})

module.exports = app
