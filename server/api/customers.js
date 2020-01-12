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

router.get('/:query', async (req, res, next) => {
	try {
		let q = req.params.query
		console.log('special query', q)
		let cust
		if (q.includes('@')) {
			cust = await Customer.findOne({
				where: {
					email: q,
				},
			})
		} else {
			cust = await Customer.findOne({
				where: {
					phoneNumber: q,
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

module.exports = router
