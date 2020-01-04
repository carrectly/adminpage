const router = require('express').Router()
const {dbMYSQL} = require('../db/database')
const Sequelize = require('sequelize')
const {Order, OrderDetails, Service} = require('../db/models')

module.exports = router

// router.get('/', async (req, res, next) => {
// 	try {
// 		console.log('Inside Order api route')
// 		const orders = await dbMYSQL.query('SELECT * FROM wp_booking_data;', {
// 			type: Sequelize.QueryTypes.SELECT,
// 		})
// 		//console.log('WP USERS', orders)
// 		res.json(orders)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll()
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
		const id = req.params.orderid
		const ord = await Order.findOne({
			where: {
				hash: id,
			},
			include: [{model: Service}],
		})
		const neword = await ord.update(req.body)
		res.json(neword)
	} catch (err) {
		next(err)
	}
})

// router.get('/:userid', async (req, res, next) => {
// 	try {
// 		let phone = req.params.userid
// 		if (phone[0] === '1') {
// 			phone = phone.slice(1)
// 		}

// 		console.log('user phone number api request', phone)
// 		const orders = await dbMYSQL.query(
// 			`SELECT * FROM wp_booking_data WHERE phone_number LIKE ${phone}`,
// 			{
// 				type: Sequelize.QueryTypes.SELECT,
// 			}
// 		)
// 		//console.log('WP USERS', orders)
// 		res.json(orders)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.get('/:userid', async (req, res, next) => {
	try {
		let phone = req.params.userid
		const orders = await Order.findAll({
			where: {
				customerPhoneNumber: phone,
			},
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

// router.get('/single/:orderid', async (req, res, next) => {
// 	try {
// 		let id = req.params.orderid.toString()

// 		console.log('single order api request', id)
// 		const orders = await dbMYSQL.query(
// 			`SELECT * FROM wp_booking_data WHERE hash = '${id}'`,
// 			{
// 				type: Sequelize.QueryTypes.SELECT,
// 			}
// 		)
// 		//console.log('WP USERS', orders)
// 		res.json(orders)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.get('/single/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid
		const orders = await Order.findOne({
			where: {
				hash: id,
			},
			include: [{model: Service}],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.put('/single/services/:orderid', async (req, res, next) => {
	try {
		console.log('updating services req.body', req.body)
		let id = req.params.orderid

		const details = await OrderDetails.findAll({
			where: {
				orderHash: id,
			},
		})

		let msgbody = {...req.body}

		console.log('ORDER DETAILS', msgbody)
		let services = Object.keys(msgbody)

		let servc
		const forLoop = async _ => {
			for (let i = 0; i < services.length; i++) {
				servc = await OrderDetails.findOne({
					where: {
						orderHash: id,
						serviceId: services[i],
					},
				})
				await servc.update(msgbody[services[i]])
			}
		}

		await forLoop()

		res.json(servc)
	} catch (err) {
		next(err)
	}
})

router.post('/single/services/:orderid', async (req, res, next) => {
	try {
		console.log('adding service to order req.body', req.body)
		let id = req.params.orderid

		const service = await Service.findOne({
			where: {
				name: req.body.service,
			},
		})

		console.log(service)
		const order = await Order.findOne({
			where: {
				hash: id,
			},
		})
		let resp = await order.addService(service)
		console.log('response afer adding service', resp)
		res.json(resp)
	} catch (err) {
		next(err)
	}
})

router.put('/single/removeservice/:orderid', async (req, res, next) => {
	try {
		console.log('adding service to order req.body', req.body)
		let id = req.params.orderid
		let svcid = req.body.serviceid
		const service = await Service.findOne({
			where: {
				id: svcid,
			},
		})

		console.log(service)
		const order = await Order.findOne({
			where: {
				hash: id,
			},
		})
		let resp = await order.removeService(service)
		console.log('response afer adding service', resp)
		res.json(resp)
	} catch (err) {
		next(err)
	}
})
