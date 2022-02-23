/* eslint-disable max-statements */
const router = require('express').Router()
module.exports = router
const { Customer, Order } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    console.log('new booking request', req.body)
    let services = req.body.services //array
    let newcust = req.body.customer
    let order = req.body.order
    await Customer.findOrCreate({
      where: {
        phoneNumber: newcust.phoneNumber,
      },
      defaults: newcust,
    })

    let ordr = await Order.create({
      ...order,
      customerPhoneNumber: newcust.phoneNumber,
    })

    const addServices = async (_) => {
      for (let i = 0; i < services.length; i++) {
        // addServices allows us to pass an array of ids but will not let us set the price for each unique service
        // await ordr.addServices(serviceIds, {
        //   through: { customerPrice: 20 },
        // })
        await ordr.addService(services[i].id, {
          through: { customerPrice: services[i].price },
        })
      }
    }

    await addServices()
    res.status(200).json('success')
  } catch (err) {
    console.log('error', err)
    res.status(400).send(err)
  }
})
