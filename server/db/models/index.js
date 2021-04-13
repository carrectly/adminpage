const User = require('./user')
const Dealer = require('./dealer')
const Driver = require('./driver')
const Service = require('./service')
const Order = require('./order')
const OrderDetails = require('./orderDetails')
const Customer = require('./customer')
const Comment = require('./comment')
const OrderDrivers = require('./orderDrivers')

Customer.hasMany(Order)
Order.belongsTo(Customer)

Order.belongsToMany(Driver, {through: 'orderdrivers'})
Driver.belongsToMany(Order, {through: 'orderdrivers'})

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
	OrderDrivers,
}
