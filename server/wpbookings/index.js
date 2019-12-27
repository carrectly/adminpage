const router = require('express').Router()
const fs = require('fs')
module.exports = router

let filepath =
	'/Users/abirkus/Desktop/carrectly/adminpage/server/wpbookings/test.json'

router.post('/newbooking', async (req, res, next) => {
	try {
		let msgbody = req.body
		console.log('req body', req.body)
		fs.writeFile(filepath, JSON.stringify(msgbody), err => {
			if (err) return console.error(err)
			console.log('File stored to', filepath)
		})
		res.json(msgbody)
	} catch (err) {
		next(err)
	}
})
