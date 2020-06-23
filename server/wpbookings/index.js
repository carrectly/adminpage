const router = require('express').Router()
const fs = require('fs')
module.exports = router
const {Customer, Order, OrderDetails, Service} = require('../db/models')

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
		msgbody.customerPhoneNumber = req.body.customer.phoneNumber
		delete msgbody.customer
		delete msgbody.services

		let ordr = await Order.create(msgbody)

		let servicesFromDb = []
		const forLoop = async _ => {
			for (let i = 0; i < services.length; i++) {
				let servc = await Service.findOne({
					where: {
						name: services[i].name,
					},
				})
				servicesFromDb.push(servc)
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

		await forLoop3()

		res.json(msgbody)
	} catch (err) {
		next(err)
	}
})
