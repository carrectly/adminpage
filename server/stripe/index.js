'use strict'
const router = require('express').Router()
const stripe = require('stripe')('sk_test_GMvVYnaDAOlBxPXfbQ28wJdM00y6wmCRlK')

router.post('/', async (req, res, next) => {
	try {
		let allCustomers = await stripe.customers.list()
		console.log('stripe customers', allCustomers.data)
		let email = req.body.email

		let singlecstmr = allCustomers.data.filter(el => el.email === email)

		console.log('SINGLE CUSTOMER FOUND', singlecstmr)
		if (singlecstmr.length !== 1) {
			singlecstmr = await stripe.customers.create({
				name: req.body.first_name + ' ' + req.body.last_name,
				email: req.body.email,
			})
		} else {
			singlecstmr = singlecstmr[0]
		}
		res.json(singlecstmr)

		// let allInvoices = await stripe.invoices.list()
		// console.log('invoices ', allInvoices.data[0].lines)

		// let invoiceItem = await stripe.invoiceItems.create({
		// 	customer: 'cus_GQBu8E7S5XYPKA',
		// 	amount: 2500,
		// 	currency: 'usd',
		// 	description: 'gas refill',
		// })

		// console.log('invoice  item', invoiceItem)

		// let invoiceItems = await stripe.invoiceItems.list()

		// console.log('invoice  items', invoiceItems)

		//let newinv = stripe.invoices.create({customer: 'cus_GQBu8E7S5XYPKA'})
	} catch (err) {
		console.error(err)
	}
})

router.post('/invoices', async (req, res, next) => {
	try {
		//console.log('req body', req.body)
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
