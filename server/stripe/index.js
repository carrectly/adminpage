'use strict'
const router = require('express').Router()
const stripe = require('stripe')('sk_test_GMvVYnaDAOlBxPXfbQ28wJdM00y6wmCRlK')
const {Order, OrderDetails, Service, Customer} = require('../db/models')

router.post('/', async (req, res, next) => {
	try {
		let allCustomers = await stripe.customers.list()

		let phone = req.body.customerPhoneNumber

		let cust = await Customer.findOne({
			where: {
				phoneNumber: phone,
			},
		})

		console.log('CUSTOMER DATA VALUES', cust.dataValues)

		let email = cust.dataValues.email
		let singlecstmr = allCustomers.data.filter(el => el.email === email)

		if (singlecstmr.length !== 1) {
			singlecstmr = await stripe.customers.create({
				name:
					cust.dataValues.firstName + ' ' + cust.dataValues.lastName,
				email: email,
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

		let services = req.body.obj.services
		console.log('CREATING INVOICE', order)
		let id = req.body.id

		const forLoop = async _ => {
			for (let i = 0; i < services.length; i++) {
				console.log(
					'service price',
					Number(services[i].orderdetails.customerPrice)
				)
				await stripe.invoiceItems.create({
					customer: id,
					amount:
						Number(services[i].orderdetails.customerPrice) * 100,
					currency: 'usd',
					description: services[i].name,
				})
			}
		}

		await forLoop()

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
