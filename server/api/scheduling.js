/* eslint-disable max-statements */
const router = require('express').Router()
const { Order } = require('../db/models')
const moment = require('moment')
const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const today = moment().startOf('day').format('YYYY-MM-DD HH:MM')
    const todayEnd = moment().endOf('day').format('YYYY-MM-DD HH:MM')
    const monthFromToday = moment().add(1, 'months').format('YYYY-MM-DD')
    console.log('monthFromToday', monthFromToday)
    const appointments = await Order.findAll({
      where: {
        pickupDate: {
          [Op.between]: [today, todayEnd]
        }
      },
      attributes: [
        [sequelize.fn('date_trunc', 'hour', sequelize.col('pickupDate')), 'hour'],
        [sequelize.fn('count', '*'), 'count']
      ],
      group: 'hour'
    })

    res.send(appointments)
  } catch (err) {
    console.log('error', err)
    res.status(400).send(err)
  }
})
