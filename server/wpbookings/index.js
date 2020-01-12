const router = require('express').Router()
const fs = require('fs')
module.exports = router
const {Customer, Order, OrderDetails, Service} = require('../db/models')

let filepath =
	'/Users/abirkus/Desktop/carrectly/adminpage/server/wpbookings/test.json'

// router.post('/newbooking', async (req, res, next) => {
// 	try {
// 		let msgbody = req.body
// 		console.log('req body', req.body)
// 		fs.writeFile(filepath, JSON.stringify(msgbody), err => {
// 			if (err) return console.error(err)
// 			console.log('File stored to', filepath)
// 		})
// 		res.json(msgbody)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.post('/newbooking', async (req, res, next) => {
	try {
		let msgbody = req.body
		console.log('wp req body', req.body)
		let services = req.body.services //array
		let newcust = req.body.customer
		let cust = await Customer.findOrCreate({
			where: {
				phoneNumber: newcust.phoneNumber,
			},
			defaults: newcust,
		})
		console.log('new customer', cust.dataValues)
		msgbody.customerPhoneNumber = req.body.customer.phoneNumber
		delete msgbody.customer
		delete msgbody.services

		let ordr = await Order.create(msgbody)

		console.log('newly created order', ordr)

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
				console.log('assigning service to order', servicesFromDb[i])
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
