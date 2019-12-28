const User = require('./user')
const Dealer = require('./dealer')
const Service = require('./service')
const Order = require('./order')
const OrderDetails = require('./orderDetails')
const Customer = require('./customer')

Customer.hasMany(Order)
Order.belongsTo(Customer)

Order.belongsToMany(Service, {through: 'orderdetails'})
Service.belongsToMany(Order, {through: 'orderdetails'})

module.exports = {
	User,
	Dealer,
	Service,
	Order,
	OrderDetails,
	Customer,
}
