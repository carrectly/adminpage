const Sequelize = require('sequelize')
const {db} = require('../database')

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
		type: Sequelize.INTEGER,
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
	comments: {
		type: Sequelize.TEXT,
	},
})

module.exports = Order
