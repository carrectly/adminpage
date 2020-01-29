const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')

const Customer = db.define('customer', {
	phoneNumber: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	location: {
		type: Sequelize.STRING,
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

//const route = `${process.env.DOMAIN}auth/google/contacts`
const createInGoogle = async inst => {
	try {
		inst.isInGoogle = true
		await axios.post(
			'http://localhost:1337/auth/google/contacts',
			inst.dataValues
		)
	} catch (err) {
		console.log(err.message)
	}
}

Customer.beforeCreate(createInGoogle)

module.exports = Customer
