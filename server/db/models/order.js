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
	status: {
		type: Sequelize.STRING,
		defaultValue: 'booked new',
	},
	customerComments: {
		type: Sequelize.TEXT,
	},
	pickupDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
		allowNull: true,
	},
	dropoffDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
		allowNull: true,
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
	driverPickUp: {
		type: Sequelize.INTEGER,
	},
	driverDropOff: {
		type: Sequelize.INTEGER,
	},
	vin: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	promoCode: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	discount: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: true,
	},
	isInCalendar: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	stickShift: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	flexibleOnTime: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
})

const createInGoogle = async inst => {
	try {
		if (inst.dataValues.status === 'confirmed') {
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
		}
	} catch (err) {
		console.log(err.message)
	}
}

// const updateInGoogle = async inst => {
// 	try {
// 		if (inst.dataValues.status === 'confirmed') {
// 			let newinst = {...inst.dataValues}
// 			console.log('updating event ---------- ', newinst)
// 			inst.isInCalendar = true
// 			let cus = await Customer.findOne({
// 				where: {phoneNumber: newinst.customerPhoneNumber},
// 			})
// 			newinst.customerName = `${cus.firstName} ${cus.lastName}`

// 			await axios.post(
// 				`${process.env.DOMAIN}/auth/google/calendar/newevent/update`,
// 				newinst
// 			)
// 		}
// 	} catch (err) {
// 		console.log(err.message)
// 	}
// }

Order.afterUpdate(createInGoogle)
// Order.afterUpdate(updateInGoogle)

module.exports = Order
