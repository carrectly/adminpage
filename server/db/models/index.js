const User = require('./user')
const Dealer = require('./dealer')
const Service = require('./service')
const Order = require('./order')
const OrderDetails = require('./orderDetails')
const Customer = require('./customer')
const Comment = require('./comment')

Customer.hasMany(Order)
Order.belongsTo(Customer)

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
}
