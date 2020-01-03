const router = require('express').Router()
const {dbMYSQL} = require('../db/database')
const Sequelize = require('sequelize')
const {Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
	try {
		console.log('Inside Order api route')
		const orders = await dbMYSQL.query('SELECT * FROM wp_booking_data;', {
			type: Sequelize.QueryTypes.SELECT,
		})
		//console.log('WP USERS', orders)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.get('/bystatus', async (req, res, next) => {
	try {
		const orders = await Order.findAll()
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.put('/', async (req, res, next) => {
	try {
		let start = req.body.dateStart
		let end = req.body.dateEnd
		if (!req.body.dateStart) {
			start = '01-12-2019'
		}

		if (!req.body.dateEnd) {
			end = '12-12-2019'
		}
		start = start
			.split('-')
			.reverse()
			.join('-')
		end = end
			.split('-')
			.reverse()
			.join('-')

		const orders = await dbMYSQL.query(
			`SELECT * FROM wp_booking_data WHERE date = '${start}';`,
			{
				type: Sequelize.QueryTypes.SELECT,
			}
		)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.put('/single/:orderid', async (req, res, next) => {
	try {
		const id = req.params.id
		const ord = await Order.findOne({
			where: {
				hash: id,
			},
		})
		const neword = await ord.update(req.body)
		res.json(neword)
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
