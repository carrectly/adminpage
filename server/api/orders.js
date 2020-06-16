const router = require('express').Router()
const Sequelize = require('sequelize')
const {Order, OrderDetails, Service, Customer} = require('../db/models')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{
					model: Customer,
				},
			],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.get('/bystatus', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				status: {
					[Op.not]: ['completed - paid'],
				},
			},
			order: [['status', 'ASC']],
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

		console.log('orders by date', start, end)
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
			include: [{model: Service}],
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

		console.log('service object', service)
		const order = await Order.findOne({
			where: {
				hash: id,
			},
		})

		let resp = await order.addService(service, {
			through: {customerPrice: service.dataValues.price},
		})

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

router.post('/', async (req, res, next) => {
	try {
		let ordr = await Order.create(req.body)
		res.json(ordr)
	} catch (err) {
		next(err)
	}
})
