const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
const Customer = require('./customer')
if (process.env.NODE_ENV !== 'production') require('../../../secrets.js')

const Order = db.define('order', {
	hash: {
		type: Sequelize.STRING,
		primaryKey: true,
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
	pickupLocation: {
		type: Sequelize.STRING,
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
	vin: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.STRING,
		values: [
			'received',
			'waiting on quote',
			'quote approved - getting serviced',
			'completed - pending invoice',
			'completed - invoice sent',
			'completed - paid',
		],
		defaultValue: 'received',
	},
	customerComments: {
		type: Sequelize.TEXT,
	},
	promoCode: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	isInCalendar: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
})

const createInGoogle = async inst => {
	try {
		let newinst = {...inst.dataValues}
		inst.isInCalendar = true
		let cus = await Customer.findOne({
			where: {phoneNumber: newinst.customerPhoneNumber},
		})
		newinst.customerName = `${cus.firstName} ${cus.lastName}`
		await axios.post(
			`${process.env.DOMAIN}/auth/google/calendar/newevent`,
			newinst
		)
	} catch (err) {
		console.log(err.message)
	}
}

const updateInGoogle = async inst => {
	try {
		let newinst = {...inst.dataValues}
		inst.isInCalendar = true
		let cus = await Customer.findOne({
			where: {phoneNumber: newinst.customerPhoneNumber},
		})
		newinst.customerName = `${cus.firstName} ${cus.lastName}`
		await axios.post(
			`${process.env.DOMAIN}/auth/google/calendar/newevent/update`,
			newinst
		)
	} catch (err) {
		console.log(err.message)
	}
}

Order.beforeCreate(createInGoogle)
Order.afterUpdate(updateInGoogle)

module.exports = Order
