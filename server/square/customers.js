const router = require('express').Router()
const {ApiError, Client, Environment} = require('square')
const {Customer} = require('../db/models')

const client = new Client({
	timeout: 3000,
	environment: Environment.Production, // `Environment.Sandbox` to access sandbox resources
	accessToken: process.env.SQUARE_TOKEN,
})

const {customersApi} = client

router.post('/', async (req, res, next) => {
	try {
		let phone = req.body.customerPhoneNumber

		let cust = await Customer.findOne({
			where: {
				phoneNumber: phone,
			},
		})

		let singlecstmr = await customersApi.searchCustomers({
			limit: 2,
			query: {
				filter: {
					emailAddress: {
						exact: cust.dataValues.email,
					},
				},
			},
		})

		if (!singlecstmr.result.customers) {
			try {
				let {result} = await customersApi.createCustomer({
					givenName: cust.dataValues.firstName,
					familyName: cust.dataValues.lastName,
					emailAddress: cust.dataValues.email,
					phoneNumber: cust.dataValues.phoneNumber,
				})
				console.log('API called successfully. Returned data: ', result)
				singlecstmr = result.customer
				singlecstmr.status = 'NEW CUSTOMER ADDED IN SQUARE'
			} catch (error) {
				if (error instanceof ApiError) {
					console.log('Errors: ', error.errors)
					singlecstmr.status = error.errors
				} else {
					console.log('Unexpected Error: ', error)
					singlecstmr.status = error
				}
			}
		} else {
			singlecstmr = singlecstmr.result.customers[0]
			singlecstmr.status = 'CUSTOMER EXISTS IN SQUARE'
		}

		res.json(singlecstmr)
	} catch (err) {
		next(err)
	}
})

module.exports = router
