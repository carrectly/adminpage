const Sequelize = require('sequelize')
const {db} = require('../database')
var axios = require('axios')

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
		primaryKey: true,
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
	console.log('instance', inst.dataValues)
	return axios
		.post('http://localhost:1337/auth/google/contacts', inst.dataValues)
		.then(function(res) {
			inst.isInGoogle = true
		})
})

module.exports = Customer
