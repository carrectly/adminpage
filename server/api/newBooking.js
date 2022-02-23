/* eslint-disable max-statements */
const router = require('express').Router()
module.exports = router
const { Customer, Order } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    console.log('new booking request', req.body)
    let services = req.body.param.services //array
    let newcust = req.body.param.customer
    let order = req.body.param.order
    await Customer.findOrCreate({
      where: {
        phoneNumber: newcust.phoneNumber,
      },
      defaults: { ...newcust, location: order.zipCode },
    })

    let ordr = await Order.create({
      ...order,
      pickupLocation: `${order.address} ${order.city} ${order.zipCode}`,
      stickShift: order.transmission === 'automatic' ? false : true,
      customerPhoneNumber: newcust.phoneNumber,
    })

    const addServices = async () => {
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
