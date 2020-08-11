const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance
const {Order, OrderDetails, Service, Customer} = require('../db/models')
//const config = require('../../squareconfig.json').sandbox
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = client.authentications.oauth2
client.basePath = process.env.squareBasePath
oauth2.accessToken = process.env.SQUARE_TOKEN

var customers = new SquareConnect.CustomersApi()

router.post('/', async (req, res, next) => {
	try {
		//console.log('env square', process.env.SQUARE_TOKEN)
		let phone = req.body.customerPhoneNumber

		let cust = await Customer.findOne({
			where: {
				phoneNumber: phone,
			},
		})

		let singlecstmr = await customers.searchCustomers({
			query: {
				filter: {
					email_address: {
						exact: cust.dataValues.email,
					},
				},
			},
		})

		singlecstmr = singlecstmr.customers
		// console.log('SINGLE CUSTOMER FOUND', singlecstmr)
		if (singlecstmr.length < 1) {
			singlecstmr = await customers.createCustomer({
				given_name: cust.dataValues.firstName,
				family_name: cust.dataValues.lastName,
				email_address: cust.dataValues.email,
				phone_number: cust.dataValues.phoneNumber,
			})
			singlecstmr = singlecstmr.customer
			singlecstmr.status = 'NEW CUSTOMER ADDED IN SQUARE'
		} else {
			singlecstmr = singlecstmr[0]
			singlecstmr.status = 'CUSTOMER EXISTS IN SQUARE'
		}
		res.json(singlecstmr)
	} catch (err) {
		next(err)
	}
})

module.exports = router
