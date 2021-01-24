const router = require('express').Router()
const Sequelize = require('sequelize')
const {Order, OrderDetails, Service, Customer} = require('../db/models')
const Op = Sequelize.Op
const moment = require('moment')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				status: {
					[Op.not]: [
						'booked new',
						'booked us',
						'followed up - text',
						'followed up - call',
						'followed up - email',
						'confirmed',
						'in process',
						'pending work approvals',
						'ready to be returned',
						'returned',
						'quote inquired by customer',
						'quote sent to a shop',
						'quote sent to a customer',
						'invoiced',
						'postponed',
					],
				},
			},
			order: [['updatedAt', 'DESC']],
			include: [{model: Customer}],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.get('/active', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				status: [
					'booked new',
					'booked us',
					'followed up - text',
					'followed up - call',
					'followed up - email',
					'confirmed',
					'in process',
					'pending work approvals',
					'ready to be returned',
					'returned',
					'quote inquired by customer',
					'quote sent to a shop',
					'quote sent to a customer',
					'invoiced',
					'postponed',
				],
			},
			order: [['updatedAt', 'DESC']],
			include: [{model: Customer}],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.put('/', async (req, res, next) => {
	try {
		let start = req.body.dateStart
		let end = req.body.dateEnd
		const orders = await Order.findAll({
			where: {
				createdAt: {
					[Op.between]: [start, end],
				},
			},
			include: [{model: Customer}],
		})

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
			include: [{model: Service}, {model: Customer}],
		})
		console.log('api received order to update', req.body)
		const neword = await ord.update(req.body)
		res.json(neword)
	} catch (err) {
		next(err)
	}
})

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

router.get('/single/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid
		const orders = await Order.findOne({
			where: {
				hash: id,
			},
			include: [{model: Service}, {model: Customer}],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.put('/single/services/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid

		let msgbody = {...req.body}
		let services = Object.keys(msgbody)
		let servc = await OrderDetails.findOne({
			where: {
				orderHash: id,
				serviceId: services[0],
			},
		})

		await servc.update(msgbody[services[0]])

		res.json(servc)
	} catch (err) {
		next(err)
	}
})

router.post('/single/services/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid

		const service = await Service.findOne({
			where: {
				name: req.body.service,
			},
		})

		const order = await Order.findOne({
			where: {
				hash: id,
			},
		})

		let resp = await order.addService(service, {
			through: {customerPrice: service.dataValues.price},
		})

		res.json(resp)
	} catch (err) {
		next(err)
	}
})

router.put('/single/removeservice/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid
		let svcid = req.body.serviceid
		const service = await Service.findOne({
			where: {
				id: svcid,
			},
		})

		const order = await Order.findOne({
			where: {
				hash: id,
			},
		})
		let resp = await order.removeService(service)
		res.json(resp)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		let ordr = await Order.create(req.body)
		res.json(ordr)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const hash = req.params.id
		await Order.destroy({
			where: {hash},
		})
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})
