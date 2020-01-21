const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
const domain = process.env.DOMAIN

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

Customer.beforeCreate((inst, options) => {
	console.log('domain', domain)
	return axios
		.post(`${domain}/auth/google/contacts`, inst.dataValues)
		.then(function(res) {
			inst.isInGoogle = true
		})
		.catch(console.log('customer hook error'))
})

module.exports = Customer
