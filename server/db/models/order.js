const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	submissionDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
	},
	pickupDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
	},
	dropoffDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
	},
	carYear: {
		type: Sequelize.NUMBER,
	},
	carMake: {
		type: Sequelize.STRING,
	},
	carModel: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		values: [
			'received',
			'waiting on quote',
			'quote approved',
			'servicing',
			'completed - pending invoice',
			'completed - invoice sent',
			'completed - paid',
		],
		defaultValue: 'received',
	},
	customerId: {
		type: Sequelize.NUMBER,
	},
})

module.exports = Order
