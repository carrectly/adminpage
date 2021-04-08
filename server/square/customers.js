const router = require('express').Router()
const {ApiError, Client, Environment} = require('square')
const {Customer} = require('../db/models')

const client = new Client({
	timeout: 3000,
	environment: Environment.Production, // `Environment.Sandbox` to access sandbox resources
	accessToken: process.env.SQUARE_TOKEN,
})

const {customersApi} = client

router.get('/:customerPhone', async (req, res, next) => {
	try {
		const phone = req.params.customerPhone

		let cust = await Customer.findOne({
			where: {
				phoneNumber: phone,
			},
		})

		let singlecstmr = await customersApi.searchCustomers({
			limit: 1,
			query: {
				filter: {
					emailAddress: {
						exact: cust.dataValues.email,
					},
				},
			},
		})

		if (!singlecstmr.result.customers) {
			let {result} = await customersApi.createCustomer({
				givenName: cust.dataValues.firstName,
				familyName: cust.dataValues.lastName,
				emailAddress: cust.dataValues.email,
				phoneNumber: cust.dataValues.phoneNumber,
			})
			console.log(
				'Customer API called successfully. Returned data: ',
				result
			)
			singlecstmr = result.customer
			singlecstmr.status = 'NEW CUSTOMER ADDED IN SQUARE'
		} else {
			singlecstmr = singlecstmr.result.customers[0]
			singlecstmr.status = 'CUSTOMER EXISTS IN SQUARE'
		}

		res.json(singlecstmr)
	} catch (error) {
		if (error instanceof ApiError) {
			console.log('Errors: ', error.errors)
		} else {
			console.log('Unexpected Error: ', error)
		}
		next(error)
	}
})

module.exports = router
