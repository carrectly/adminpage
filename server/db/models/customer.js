const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
const domain = 'http://localhost:1337'

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
		.post(`http://localhost:1337/auth/google/contacts`, inst.dataValues)
		.then(function(res) {
			inst.isInGoogle = true
		})
		.catch(console.log('customer hook error'))
})

module.exports = Customer
