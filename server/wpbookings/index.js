/* eslint-disable max-statements */
const router = require('express').Router()
module.exports = router
var axios = require('axios')
const {Customer, Order, Service} = require('../db/models')
const moment = require('moment')

router.post('/newbooking', async (req, res, next) => {
	try {
		let msgbody = req.body
		let services = req.body.services //array
		let newcust = req.body.customer
		let cust = await Customer.findOrCreate({
			where: {
				phoneNumber: newcust.phoneNumber,
			},
			defaults: newcust,
		})

		let detailedResponse = {}

		if (cust === null) {
			detailedResponse.customer = 'failed to created customer'
		} else {
			detailedResponse.customer = {
				status: 'success',
				data: cust,
			}
		}

		msgbody.customerPhoneNumber = req.body.customer.phoneNumber
		delete msgbody.customer
		delete msgbody.services
		// if (!msgbody.pickupDate) {
		// 	msgbody.pickupDate = moment()
		// }
		// if (!msgbody.dropoffDate) {
		// 	msgbody.dropoffDate = moment(msgbody.pickupDate).add(9, 'hours')
		// }

		let ordr = await Order.create(msgbody)

		if (ordr === null) {
			detailedResponse.order = 'failed to create order'
		} else {
			detailedResponse.order = {
				status: 'success',
				data: ordr,
			}
			const email = cust[0].email
			const orderid = ordr.hash
			const make = ordr.carMake
			const model = ordr.carModel
			const year = ordr.carYear
			try {
				await axios.post(
					`${process.env.DOMAIN}/auth/google/gmail/sendconfirmation`,
					{
						email,
						orderid,
						make,
						model,
						year,
					}
				)
			} catch (err) {
				console.error(err)
			}
		}

		let servicesFromDb = []
		let failedServices = []
		const forLoop = async _ => {
			for (let i = 0; i < services.length; i++) {
				let servc = await Service.findOne({
					where: {
						name: services[i].name,
					},
				})
				if (servc === null) {
					console.log('service name not found')
					failedServices.push({
						'service name not found': services[i].name,
					})
				} else {
					servicesFromDb.push(servc)
				}
			}
		}
		await forLoop()

		const forLoop3 = async _ => {
			for (let i = 0; i < servicesFromDb.length; i++) {
				await ordr.addService(servicesFromDb[i], {
					through: {
						customerPrice: servicesFromDb[i].dataValues.price,
					},
				})
			}
		}

		if (failedServices.length > 0) {
			detailedResponse.services = failedServices
		} else {
			detailedResponse.services = 'success'
		}

		await forLoop3()
		res.status(200).json(detailedResponse)
	} catch (err) {
		res.status(400).send(err.errors[0].message)
	}
})

router.post('/bulkorders', async (req, res, next) => {
	try {
		let msgbody = req.body
		await Order.bulkCreate(msgbody)
		res.status(200).json({status: 'success'})
	} catch (err) {
		res.status(400).send(err.errors[0].message)
	}
})

router.post('/bulkcustomers', async (req, res, next) => {
	try {
		let msgbody = req.body
		await Customer.bulkCreate(msgbody)
		res.status(200).json({status: 'success'})
	} catch (err) {
		res.status(400).send(err.errors[0].message)
	}
})
