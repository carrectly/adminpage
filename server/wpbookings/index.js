const router = require('express').Router()
module.exports = router
const {Customer, Order, Service} = require('../db/models')

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

		let ordr = await Order.create(msgbody)

		if (ordr === null) {
			detailedResponse.order = 'failed to create order'
		} else {
			detailedResponse.order = {
				status: 'success',
				data: ordr,
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
		console.log('request received', msgbody)
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
		res.status(200)
	} catch (err) {
		res.status(400).send(err.errors[0].message)
	}
})
