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

Driver.hasOne(Order, {as: 'pickUpDriver', foreignKey: 'pickUpDriverId'})
Driver.hasOne(Order, {as: 'returnDriver', foreignKey: 'returnDriverId'})
Order.belongsTo(Driver, {as: 'pickUpDriver', foreignKey: 'pickUpDriverId'})
Order.belongsTo(Driver, {as: 'returnDriver', foreignKey: 'returnDriverId'})

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
