const router = require('express').Router()
const Sequelize = require('sequelize')
const {
  Order,
  OrderDetails,
  Service,
  Customer,
  Driver,
  Dealer,
  User,
} = require('../db/models')
const helper = require('../utilServer')
const Op = Sequelize.Op
module.exports = router

const associations = [
  { model: Service },
  { model: Dealer },
  { model: Customer },
  { model: User, as: 'customerRep' },
  { model: Driver, as: 'pickUpDriver' },
  { model: Driver, as: 'returnDriver' },
]

router.get('/', async (req, res, next) => {
  try {
    const activeArr = helper.getStatusArray
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.not]: activeArr,
        },
      },
      order: [['updatedAt', 'DESC']],
      include: [{ model: Customer }],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/active', async (req, res, next) => {
  try {
    const activeArr = helper.getStatusArray
    const orders = await Order.findAll({
      where: {
        status: activeArr,
      },
      order: [['updatedAt', 'DESC']],
      include: associations,
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/detailing', async (req, res, next) => {
  try {
    const detailingOrders = helper.getDetailingStatusArray
    const orders = await Order.findAll({
      where: {
        status: detailingOrders,
      },
      include: associations,
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/driver/:email', async (req, res, next) => {
  const email = req.params.email
  try {
    const completedStatusesArr = helper.getCompletedStatusArray
    const driver = await Driver.findOne({
      where: {
        email,
      },
    })
    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          { pickUpDriverId: driver.dataValues.id },
          { returnDriverId: driver.dataValues.id },
        ],
        [Op.and]: [
          {
            status: {
              [Op.not]: completedStatusesArr,
            },
          },
        ],
      },
      include: associations,
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let start = req.body.dateStart
    let end = req.body.dateEnd
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      include: [{ model: Customer }],
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/single/:orderid', async (req, res, next) => {
  try {
    await Order.update(req.body, {
      where: {
        hash: req.params.orderid,
      },
    })
    const ord = await Order.findByPk(req.params.orderid, {
      include: associations,
    })
    res.json(ord.dataValues)
  } catch (err) {
    next(err)
  }
})

router.get('/:userid', async (req, res, next) => {
  try {
    let phone = req.params.userid
    const orders = await Order.findAll({
      where: {
        customerPhoneNumber: phone,
      },
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/single/:orderid', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderid, {
      include: associations,
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/single/services/:orderid', async (req, res, next) => {
  try {
    let id = req.params.orderid

    let msgbody = { ...req.body }
    let services = Object.keys(msgbody)
    let servc = await OrderDetails.findOne({
      where: {
        orderHash: id,
        serviceId: services[0],
      },
    })

    await servc.update(msgbody[services[0]])

    res.json(servc)
  } catch (err) {
    next(err)
  }
})

router.post('/single/driver/:orderid', async (req, res, next) => {
  try {
    const driver = { [`${req.body.tripType}DriverId`]: req.body.driverId }
    await Order.update(driver, {
      where: {
        hash: req.params.orderid,
      },
    })
    const order = await Order.findByPk(req.params.orderid, {
      include: associations,
    })
    res.json(order.dataValues)
  } catch (err) {
    next(err)
  }
})

router.post('/single/customerRep/:orderid', async (req, res, next) => {
  try {
    await Order.update(
      { customerRepId: req.body.userId },
      {
        where: {
          hash: req.params.orderid,
        },
      }
    )

    const order = await Order.findByPk(req.params.orderid, {
      include: associations,
    })
    res.json(order.dataValues)
  } catch (err) {
    next(err)
  }
})

router.post('/single/services/:orderid/:serviceid', async (req, res, next) => {
  try {
    const orderId = req.params.orderid
    const serviceId = req.params.serviceid
    const service = await Service.findByPk(serviceId)
    const order = await Order.findByPk(orderId)

    let resp = await order.addService(service, {
      through: { customerPrice: service.dataValues.price },
    })

    res.json(resp)
  } catch (err) {
    next(err)
  }
})

router.put('/single/removeservice/:orderid', async (req, res, next) => {
  try {
    let id = req.params.orderid
    let svcid = req.body.serviceid
    const service = await Service.findOne({
      where: {
        id: svcid,
      },
    })

    const order = await Order.findOne({
      where: {
        hash: id,
      },
    })
    let resp = await order.removeService(service)
    res.json(resp)
  } catch (err) {
    next(err)
  }
})

router.post('/single/dealers/:orderid', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderid)
    await order.addDealer(req.body.dealerId)
    const resp = await Order.findByPk(req.params.orderid, {
      include: associations,
    })

    res.json(resp.dataValues)
  } catch (err) {
    next(err)
  }
})

router.put('/single/dealers/:orderid', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderid)
    await order.removeDealer(req.body.dealerId)
    const resp = await Order.findByPk(req.params.orderid, {
      include: associations,
    })

    res.json(resp.dataValues)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let ordr = await Order.create(req.body)
    res.json(ordr)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const hash = req.params.id
    await Order.destroy({
      where: { hash },
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
