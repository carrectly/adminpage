'use strict'
const router = require('express').Router()
const stripe = require('stripe')('sk_test_GMvVYnaDAOlBxPXfbQ28wJdM00y6wmCRlK')

router.post('/', async (req, res, next) => {
	try {
		let allCustomers = await stripe.customers.list()

		let email = req.body.email

		let singlecstmr = allCustomers.data.filter(el => el.email === email)

		if (singlecstmr.length !== 1) {
			singlecstmr = await stripe.customers.create({
				name: req.body.first_name + ' ' + req.body.last_name,
				email: req.body.email,
			})
			singlecstmr.status = 'NEW CUSTOMER ADDED IN STRIPE'
		} else {
			singlecstmr = singlecstmr[0]
			singlecstmr.status = 'CUSTOMER EXISTS IN STRIPE'
		}
		res.json(singlecstmr)
	} catch (err) {
		console.error(err)
	}
})

router.post('/invoices', async (req, res, next) => {
	try {
		let order = req.body.obj

		let id = req.body.id

		let invoiceItem = await stripe.invoiceItems.create({
			customer: id,
			amount: 2500,
			currency: 'usd',
			description: order.service,
		})

		let invoice = await stripe.invoices.create({
			customer: id,
		})
		let finalinvoice = await stripe.invoices.retrieve(invoice.id)

		res.json(finalinvoice)
	} catch (err) {
		console.error(err)
	}
})

router.use((req, res, next) => {
	const err = new Error('API route not found!')
	err.status = 404
	next(err)
})

module.exports = router
