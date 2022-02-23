/* eslint-disable max-statements */
const router = require('express').Router()
module.exports = router
var axios = require('axios')
const { Customer, Order, Service } = require('../db/models')
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
    msgbody.pickupDate = moment(msgbody.pickupDate).format(
      'YYYY-MM-DD HH:mm:ss'
    )

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
    const forLoop = async (_) => {
      for (let i = 0; i < services.length; i++) {
        let servc = await Service.findOne({
          where: {
            name: services[i].name,
          },
        })
        if (servc === null) {
          failedServices.push({
            'service name not found': services[i].name,
          })
        } else {
          servicesFromDb.push(servc)
        }
      }
    }
    await forLoop()

    const forLoop3 = async (_) => {
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
    res.status(400).send(err)
  }
})

router.post('/neworder', async (req, res, next) => {
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
    res.status(200).json('ok')
  } catch (err) {
    console.log('error', err)
    res.status(400).send(err)
  }
})
