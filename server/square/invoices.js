const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance
const axios = require('axios')
const {Order} = require('../db/models')
const moment = require('moment')

//const config = require('../../squareconfig.json').sandbox
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = client.authentications.oauth2
client.basePath = process.env.squareBasePath
oauth2.accessToken = process.env.SQUARE_TOKEN

var orders = new SquareConnect.OrdersApi()
var dueDate = moment()
	.add(7, 'days')
	.format('YYYY-MM-DD')

router.post('/', async (req, res, next) => {
	try {
		let order = req.body.obj
		let customerid = req.body.id
		//console.log('square customer id', customerid)
		let services = req.body.obj.services
		let idempKey = `${order.hash}${Math.floor(Math.random() * 1000)}`

		// console.log('here is our idempotency key', idempKey)
		// console.log('here are the services', services)
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

		//console.log('order discount', orderDiscount)
		let singleordr = await orders.createOrder(
			process.env.SQUARE_LOCATION_ID,
			{
				idempotency_key: idempKey,
				order: {
					location_id: process.env.SQUARE_LOCATION_ID,
					reference_id: `${order.hash}`,
					line_items: lineItems,
					customer_id: customerid,
					discounts: orderDiscount,
				},
			}
		)

		//console.log('created new order in square', singleordr)

		let orderid = singleordr.order.id

		let invoice = await axios({
			method: 'post',
			url: `${process.env.squareBasePath}/v2/invoices`,
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
					title: `Thank you for servicing you car with us - Carrectly - ${orderid}`,
					primary_recipient: {
						customer_id: customerid,
					},
					payment_requests: [
						{
							request_method: 'EMAIL',
							request_type: 'BALANCE',
							due_date: `${dueDate}`,
							tipping_enabled: true,
						},
					],
					description: `Hi there! 

We appreciate your business and glad we were able to help. 
Hope you liked the quality, simplicity, and convenience of our service. 
The concierge should have walked you through everything when the car was delivered, but please call or text us if you have any questions. 
__________

Feedback:
We are working on building a service that is easy to use and helpful to more Chicagoans, so if you've experienced any glitches, confusion, or have any suggestions for us  - please let us know so we can improve.
If you are happy with the service, take a moment to write a review. As a small start-up, we are trying to gain visibility these are tremendously helpful to small businesses. 
Also, if you refer a friend, we will provide both of you with some discount. All they have to do is to mention you during the booking request. 

YELP: https://www.yelp.com/biz/carrectly-auto-care-chicago
GOOGLE: http://bit.ly/2vloaPl

Have a fantastic rest of the week! Thank you for servicing your car - Carrectly!`,
				},
			},
		})

		// console.log('invoice .........', invoice.data.invoice)
		res.json(invoice.data)
	} catch (err) {
		next(err)
	}
})

module.exports = router
