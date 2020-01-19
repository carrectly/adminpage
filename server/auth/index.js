const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
	try {
		const guestId = req.session.id
		console.log('guestId: ', guestId)
		const user = await User.findOne({where: {email: req.body.email}})
		if (!user) {
			console.log('No such user found:', req.body.email)
			res.status(401).send('Wrong username and/or password')
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for user:', req.body.email)
			res.status(401).send('Wrong username and/or password')
		} else {
			const data = {
				user,
				guestId,
			}
			req.login(user, err => (err ? next(err) : res.json(data)))
		}
	} catch (err) {
		next(err)
	}
})

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body)
		req.login(user, err => (err ? next(err) : res.json(user)))
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists')
		} else {
			next(err)
		}
	}
})

router.post('/logout', (req, res) => {
	req.logout()
	req.session.destroy()
	res.redirect('/')
})

router.get('/me', (req, res) => {
	res.json(req.user)
})

router.use('/google', require('./google'))

//const {superrouter} = require('./googleclient')
//router.use('/oauth2callback', superrouter)

// router.get('/oauth2callback', async (req, res, next) => {
// 	try {
// 		let code = req.query.code
// 		res.end('Authentication successful! Please return to the console.')
// 		// const {tokens} = await this.oAuth2Client.getToken(code)
// 		// this.oAuth2Client.credentials = tokens
// 		// let str = JSON.stringify(tokens)
// 		// usr.update({[tokenType]: str})
// 	} catch (err) {
// 		next(err)
// 	}
// })
