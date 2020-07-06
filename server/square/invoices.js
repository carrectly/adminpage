const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance
const axios = require('axios')
const {Order} = require('../db/models')
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
		let idempKey = `${order.hash}${Math.floor(Math.random() * 1000)}`

		console.log('here is our idempotency key', idempKey)
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

		let discountAmt = Number(order.discount) * 100

		let orderDiscount = discountAmt
			? [
					{
						amount_money: {
							amount: discountAmt,
							currency: 'USD',
						},
						name: `${order.promoCode}`,
					},
			  ]
			: null

		console.log('order discount', orderDiscount)
		let singleordr = await orders.createOrder(
			`${process.env.SQUARE_LOCATION_ID}`,
			{
				idempotency_key: idempKey,
				order: {
					location_id: `${process.env.SQUARE_LOCATION_ID}`,
					reference_id: `${order.hash}`,
					line_items: lineItems,
					customer_id: customerid,
					discounts: orderDiscount,
				},
			}
		)

		console.log('created new order in square', singleordr)

		let orderid = singleordr.order.id

		let invoice = await axios({
			method: 'post',
			url: 'https://connect.squareupsandbox.com/v2/invoices',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${oauth2.accessToken}`,
			},
			data: {
				idempotency_key: idempKey,
				invoice: {
					order_id: orderid,
					location_id: `${process.env.SQUARE_LOCATION_ID}`,
					invoice_number: `${idempKey}`,
					title: `${order.carMake} ${order.carModel} ${order.carYear}`,
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

		console.log('invoice .........', invoice.data.invoice)
		res.json(invoice.data)
	} catch (err) {
		next(err)
	}
})

module.exports = router
