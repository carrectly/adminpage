const {User, Customer, Order, OrderDetails, Service} = require('./models')
const {db} = require('./database.js')
var faker = require('faker')
const Sequelize = require('sequelize')

let customerSeed = []
let userSeed = []
let orderSeed = []
let orderDetailSeed = []
let serviceSeed = []
const statusArray = [
	'received',
	'waiting on quote',
	'quote approved',
	'servicing',
	'completed - pending invoice',
	'completed - invoice sent',
	'completed - paid',
]

for (let i = 0; i < 10; i++) {
	userSeed.push({
		email: faker.internet.email(),
		password: '123',
		shippingAddress: faker.address.streetAddress(),
	})
}

for (let i = 0; i < 10; i++) {
	customerSeed.push({
		email: faker.internet.email(),
		location: faker.address.streetAddress(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		phoneNumber: faker.phone.phoneNumber(),
	})
}

for (let i = 0; i < 10; i++) {
	orderSeed.push({
		submissionDate: faker.date.past(),
		status: statusArray[Math.floor(Math.random() * statusArray.length)],
		customerId: Math.floor(i / 2) + 1,
		pickupDate: faker.date.past(),
		dropoffDate: faker.date.past(),
		carYear: faker.random.number(),
		carMake: faker.commerce.productName(),
		carModel: faker.commerce.productName(),
		comments: faker.lorem.sentence(),
	})
}

for (let i = 0; i < 10; i++) {
	orderDetailSeed.push({
		customerPrice: faker.commerce.price(),
		dealerPrice: faker.commerce.price(),
		orderId: i + 1,
		serviceId: i + 1,
	})
}

for (let i = 0; i < 10; i++) {
	serviceSeed.push({
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		description: faker.lorem.sentence(),
	})
}

const seed = async () => {
	try {
		await db.sync({force: true})
		await User.create({
			email: 'cody@email.com',
			password: '123',
			isAdmin: true,
			shippingAddress: faker.address.streetAddress(),
		})
		await User.bulkCreate(userSeed)
		await Customer.create(customerSeed[0]).catch(
			Sequelize.ValidationError,
			function(err) {
				console.error('User Exists', err.name)
			}
		)
		await Customer.create(customerSeed[1]).catch(
			Sequelize.ValidationError,
			function(err) {
				console.error('User Exists', err.name)
			}
		)
		await Customer.create(customerSeed[2]).catch(
			Sequelize.ValidationError,
			function(err) {
				console.error('User Exists', err.name)
			}
		)

		//await Customer.bulkCreate(customerSeed)
		// await Order.bulkCreate(orderSeed)
		// await Service.bulkCreate(serviceSeed)
		// await OrderDetails.bulkCreate(orderDetailSeed)
	} catch (err) {
		console.log('Error seeding bulk file', err)
	}
}

seed()
	.then(() => {
		console.log('Seeding success!')
		db.close()
	})
	.catch(err => {
		console.error('Oh noes! Something went wrong!')
		console.error(err)
		db.close()
	})

module.exports = seed
