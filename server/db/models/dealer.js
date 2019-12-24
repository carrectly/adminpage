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
