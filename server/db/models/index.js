const User = require('./user')
const Dealer = require('./dealer')
const Driver = require('./driver')
const Service = require('./service')
const Order = require('./order')
const OrderDetails = require('./orderDetails')
const Customer = require('./customer')
const Comment = require('./comment')

Customer.hasMany(Order)
Order.belongsTo(Customer)

Driver.hasMany(Order, {
	foreignKey: 'driverPickUp',
})
Driver.hasMany(Order, {
	foreignKey: 'driverDropOff',
})

Order.belongsToMany(Service, {through: 'orderdetails'})
Service.belongsToMany(Order, {through: 'orderdetails'})

Order.hasMany(Comment)

module.exports = {
	User,
	Dealer,
	Service,
	Order,
	OrderDetails,
	Customer,
	Comment,
	Driver,
}
