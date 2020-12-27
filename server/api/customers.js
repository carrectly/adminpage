const router = require('express').Router()
const {Customer, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const allCust = await Customer.findAll({})
		res.json(allCust)
	} catch (err) {
		next(err)
	}
})

router.get('/single/:id', async (req, res, next) => {
	try {
		let id = req.params.id
		const oneCust = await Customer.findOne({
			where: {
				phoneNumber: id,
			},
		})
		res.json(oneCust)
	} catch (err) {
		next(err)
	}
})

router.put('/single/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		const cust = await Customer.findOne({
			where: {
				phoneNumber: id,
			},
		})
		const newcust = await cust.update(req.body)
		res.json(newcust)
	} catch (err) {
		next(err)
	}
})

router.post('/single', async (req, res, next) => {
	try {
		const cust = await Customer.create(req.body)
		res.json(cust)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const phoneNumber = req.params.id
		const orders = await Order.findAll({
			where: {
				customerPhoneNumber: phoneNumber,
			},
		})
		console.log('orders belonging to user', orders.length)
		if (orders.length > 0) {
			throw new Error(
				'Customer has more than one order. Please delete orders before deleting the customer!'
			)
		}

		await Customer.destroy({
			where: {phoneNumber},
		})
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router
