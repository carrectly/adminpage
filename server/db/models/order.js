const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
const Customer = require('./customer')

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
	comments: {
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

Order.beforeCreate((inst, options) => {
	let newinst = {...inst.dataValues}
	return Customer.findOne({
		where: {phoneNumber: newinst.customerPhoneNumber},
	})
		.then(cus => {
			inst.isInCalendar = true
			newinst.customerName = `${cus.firstName} ${cus.lastName}`
			console.log('order instance after finding the customer', newinst)
			axios.post(
				'https://carrectlyadmin.herokuapp.com/auth/google/calendar/newevent',
				newinst
			)
		})
		.catch(console.log('order hook error: before create'))
})

Order.afterUpdate((inst, options) => {
	let newinst = {...inst.dataValues}
	return Customer.findOne({
		where: {phoneNumber: newinst.customerPhoneNumber},
	})
		.then(cus => {
			newinst.customerName = `${cus.firstName} ${cus.lastName}`
			console.log('order instance after finding the customer', newinst)
			axios.post(
				'https://carrectlyadmin.herokuapp.com/auth/google/calendar/newevent/update',
				newinst
			)
		})
		.catch(console.log('order hook error: after create'))
})

module.exports = Order
