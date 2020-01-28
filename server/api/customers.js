const router = require('express').Router()
const {Customer} = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const allCust = await Customer.findAll({})
		res.json(allCust)
	} catch (err) {
		next(err)
	}
})

router.put('/', async (req, res, next) => {
	try {
		let q = req.body
		console.log('special query', q)
		let cust
		if (q.email) {
			cust = await Customer.findOne({
				where: {
					email: q.email,
				},
			})
		} else {
			cust = await Customer.findOne({
				where: {
					phoneNumber: q.phone,
				},
			})
		}
		res.json(cust)
	} catch (err) {
		next(err)
	}
})

router.get('/single/:id', async (req, res, next) => {
	try {
		let id = req.params.id
		console.log('inside api', id)
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

module.exports = router
