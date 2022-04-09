/* eslint-disable max-statements */
const router = require('express').Router()
const { Order, Driver } = require('../db/models')
const moment = require('moment')
const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const today = moment().startOf('day').format('YYYY-MM-DD')
    const monthFromToday = moment().add(1, 'months').format('YYYY-MM-DD')
    const appointments = await Order.findAll({
      where: {
        pickupDate: {
          [Op.between]: [today, monthFromToday]
        }
      },
      attributes: [
        [sequelize.fn('date_trunc', 'hour', sequelize.col('pickupDate')), 'hour'],
        [sequelize.fn('count', '*'), 'count']
      ],
      group: 'hour'
    })

    const activeDrivers = await Driver.count({
      where: {
        status: 'active'
      }
    })
    const disableTimesArr = appointments.filter((appt) => appt.dataValues.count >= activeDrivers)

    res.send(disableTimesArr)
  } catch (err) {
    console.log('error', err)
    res.status(400).send(err)
  }
})
