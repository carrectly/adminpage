const {db} = require('../database')
const Sequelize = require('sequelize')

const Dealer = db.define('dealer', {
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
	specialty: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	location: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
})

module.exports = Dealer
