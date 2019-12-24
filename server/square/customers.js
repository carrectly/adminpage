const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance

const config = require('../../squareconfig.json').sandbox
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = client.authentications.oauth2
client.basePath = 'https://connect.squareupsandbox.com'
oauth2.accessToken = config.squareAccessToken

var customers = new SquareConnect.CustomersApi()

router.post('/', async (req, res, next) => {
	try {
		//console.log('customers keys', customers.searchCustomers)
		console.log('req body', req.body.email)
		let email = req.body.email
		const cstmr = await customers.listCustomers()
		console.log('cstmr', cstmr.customers)
		let singlecstmr = cstmr.customers.filter(
			el => el.email_address === email
		)

		console.log('SINGLE CUSTOMER FOUND', singlecstmr)
		if (singlecstmr.length !== 1) {
			singlecstmr = await customers.createCustomer({
				given_name: req.body.first_name,
				family_name: req.body.last_name,
				email_address: req.body.email,
			})
		} else {
			singlecstmr = singlecstmr[0]
		}
		res.json(singlecstmr)
	} catch (err) {
		next(err)
	}
})

module.exports = router
