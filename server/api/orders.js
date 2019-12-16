const router = require('express').Router()
const {dbMYSQL} = require('../db/database')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
	try {
		console.log('Inside Order api route')
		const orders = await dbMYSQL.query(
			'SELECT * FROM wp_booking_data LIMIT 50',
			{
				type: Sequelize.QueryTypes.SELECT,
			}
		)
		//console.log('WP USERS', orders)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.get('/:userid', async (req, res, next) => {
	try {
		let phone = req.params.userid
		if (phone[0] === '1') {
			phone = phone.slice(1)
		}

		console.log('user phone number api request', phone)
		const orders = await dbMYSQL.query(
			`SELECT * FROM wp_booking_data WHERE phone_number LIKE ${phone}`,
			{
				type: Sequelize.QueryTypes.SELECT,
			}
		)
		//console.log('WP USERS', orders)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.get('/single/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid.toString()

		console.log('single order api request', id)
		const orders = await dbMYSQL.query(
			`SELECT * FROM wp_booking_data WHERE hash = '${id}'`,
			{
				type: Sequelize.QueryTypes.SELECT,
			}
		)
		//console.log('WP USERS', orders)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})
