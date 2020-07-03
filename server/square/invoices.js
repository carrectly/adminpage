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
		console.log('order', req.body)
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

		const currentOrderInDB = await Order.findOne({
			where: {
				hash: order.hash,
			},
		})

		if (currentOrderInDB.dataValues.squareOrderId) {
			// const orderFromSquare = await orders.batchRetrieveOrders(
			// 	`${process.env.SQUARE_LOCATION_ID}`,
			// 	{
			// 		order_ids: [`${currentOrderInDB.dataValues.squareOrderId}`],
			// 	}
			// )
			// console.log('found this order in square', orderFromSquare.orders[0])
			// const updatedOrderFromSquare = await orders.updateOrder(
			// 	`${process.env.SQUARE_LOCATION_ID}`,
			// 	`${currentOrderInDB.dataValues.squareOrderId}`,
			// 	{
			// 		fields_to_clear: ['line_items'],
			// 		idempotency_key: `${order.hash}${Math.floor(
			// 			Math.random() * 1000
			// 		)}`,
			// 		order: {
			// 			location_id: `${process.env.SQUARE_LOCATION_ID}`,
			// 			reference_id: `${order.hash}`,
			// 			line_items: lineItems,
			// 			customer_id: customerid,
			// 			version: orderFromSquare.orders[0].version,
			// 		},
			// 	}
			// )

			// console.log('updated this order in square', updatedOrderFromSquare)

			let singleordr = await orders.createOrder(
				`${process.env.SQUARE_LOCATION_ID}`,
				{
					idempotency_key: `${order.hash}${Math.floor(
						Math.random() * 1000
					)}`,
					order: {
						location_id: `${process.env.SQUARE_LOCATION_ID}`,
						reference_id: `${order.hash}`,
						line_items: lineItems,
						customer_id: customerid,
					},
				}
			)

			let orderid = singleordr.order.id

			let invoice = await axios({
				method: 'put',
				url: `https://connect.squareupsandbox.com/v2/invoices/${currentOrderInDB.squareInvoiceId}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${oauth2.accessToken}`,
				},
				data: {
					idempotency_key: `${order.hash}${Math.floor(
						Math.random() * 1000
					)}`,
					invoice: {
						id: `${order.hash}`,
						order_id: orderid,
						location_id: `${process.env.SQUARE_LOCATION_ID}`,
						invoice_number: `${order.hash}`,
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

			await currentOrderInDB.update({
				squareOrderId: orderid,
			})
		} else {
			let singleordr = await orders.createOrder(
				`${process.env.SQUARE_LOCATION_ID}`,
				{
					idempotency_key: `${order.hash}`,
					order: {
						location_id: `${process.env.SQUARE_LOCATION_ID}`,
						reference_id: `${order.hash}`,
						line_items: lineItems,
						customer_id: customerid,
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
					idempotency_key: `${order.hash}`,
					invoice: {
						order_id: orderid,
						location_id: `${process.env.SQUARE_LOCATION_ID}`,
						invoice_number: `${order.hash}`,
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
			await currentOrderInDB.update({
				squareOrderId: orderid,
				squareInvoiceId: invoice.data.invoice.id,
			})

			res.json(invoice.data)
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router
