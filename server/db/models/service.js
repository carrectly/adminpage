const Sequelize = require('sequelize')
const db = require('../db')

const Service = db.define('service', {
	name: Sequelize.STRING,
	price: {
		type: Sequelize.DECIMAL(10, 2), //check if this works after seeding the file
		allowNull: false,
	},
	description: Sequelize.TEXT,
})

module.exports = Service
