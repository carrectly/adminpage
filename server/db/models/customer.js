const Sequelize = require('sequelize')
const db = require('../db')

const Customer = db.define('customer', {
	location: {
		type: Sequelize.STRING,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
	phoneNumber: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.EMAIL,
	},
	customerId: {
		type: Sequelize.NUMBER,
	},
})

module.exports = Customer
