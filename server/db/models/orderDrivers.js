const Sequelize = require('sequelize')
const db = require('../database')

const OrderDrivers = db.define('orderdrivers', {
	tripDuration: Sequelize.STRING,
	tripType: Sequelize.STRING,
})

module.exports = OrderDrivers
