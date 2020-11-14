const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
if (process.env.NODE_ENV !== 'production') require('../../../secrets.js')

const Customer = db.define('customer', {
	phoneNumber: {
		type: Sequelize.BIGINT,
		primaryKey: true,
	},
	location: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	isInGoogle: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
})

const createInGoogle = async inst => {
	console.log('contacts route', process.env.DOMAIN)
	try {
		inst.isInGoogle = true
		await axios.post(
			`${process.env.DOMAIN}/auth/google/contacts`,
			inst.dataValues
		)
	} catch (err) {
		console.log(err.message)
	}
}

Customer.beforeCreate(createInGoogle)

module.exports = Customer
