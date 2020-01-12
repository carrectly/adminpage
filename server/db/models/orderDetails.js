const Sequelize = require('sequelize')
const {db} = require('../database')
const Service = require('./service')

const OrderDetails = db.define('orderdetails', {
	customerPrice: Sequelize.DECIMAL(10, 2),
	dealerPrice: Sequelize.DECIMAL(10, 2),
})

module.exports = OrderDetails
