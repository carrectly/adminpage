const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance
const axios = require('axios')
//const config = require('../../squareconfig.json').sandbox
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = client.authentications.oauth2
client.basePath = 'https://connect.squareupsandbox.com'
oauth2.accessToken = process.env.SQUARE_TOKEN

var orders = new SquareConnect.OrdersApi()

router.post('/', async (req, res, next) => {
	try {
		let order = req.body.obj
		let customerid = req.body.id
		let services = req.body.obj.services
		let lineItems = []
		services.forEach(service => {
			let amt = Number(service.orderdetails.customerPrice) * 100
			lineItems.push({
				name: service.name,
				quantity: '1',
				base_price_money: {
					amount: amt,
					currency: 'USD',
				},
			})
		})

		let singleordr = await orders.createOrder('PRV2GHZVTGW0P', {
			idempotency_key: `${order.hash}`,
			order: {
				reference_id: `${order.hash}`,
				line_items: lineItems,
			},
		})

		let orderid = singleordr.order.id

		let invoice = await axios({
			method: 'post',
			url: 'https://connect.squareupsandbox.com/v2/invoices',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer EAAAEPC4hWEeDK2uS1SQgwBVpFuMj47M4y4DjkhLfcBdAPhrBLAwjWTqrzE7Dbm-',
			},
			data: {
				idempotency_key: `${order.hash}`,
				invoice: {
					order_id: orderid,
					location_id: 'PRV2GHZVTGW0P',
					primary_recipient: {
						customer_id: customerid,
					},
					payment_requests: [
						{
							request_method: 'EMAIL',
							request_type: 'BALANCE',
							due_date: '2030-01-01',
							tipping_enabled: true,
						},
					],
				},
			},
		})
		res.json(invoice.data)
	} catch (err) {
		next(err)
	}
})

module.exports = router
