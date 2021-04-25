const db = require('../database')
const Sequelize = require('sequelize')

const Driver = db.define('driver', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	tagColor: {
		type: Sequelize.STRING,
	},
})

module.exports = Driver
