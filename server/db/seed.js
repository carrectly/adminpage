const {User, Customer, Order, Service, Dealer} = require('./models')
const db = require('./database.js')
var faker = require('faker')
const Sequelize = require('sequelize')
const fs = require('fs')

const legacyOrders = JSON.parse(
	fs.readFileSync('./seedData/orders.json', 'utf-8')
)
console.log('legacy orders', legacyOrders[0])
const legacyCustomers = JSON.parse(
	fs.readFileSync('./seedData/customers.json', 'utf-8')
)
const servicesSeed = JSON.parse(
	fs.readFileSync('./seedData/services.json', 'utf-8')
)

let customerSeed = []
let dealerSeed = []
const statusArray = [
	'received',
	'waiting on quote',
	'quote approved - getting serviced',
	'completed - pending invoice',
	'completed - invoice sent',
	'completed - paid',
]

dealerSeed.push({
	name: 'United Tires',
	email: 'birkusandre@gmail.com',
	phoneNumber: faker.phone.phoneNumberFormat(0),
	specialty: 'Oil change',
	location: faker.address.streetAddress(),
})

dealerSeed.push({
	name: "Duran's bodyshop",
	email: 'birkusandre@gmail.com',
	phoneNumber: faker.phone.phoneNumberFormat(0),
	specialty: 'Body Work',
	location: faker.address.streetAddress(),
})

dealerSeed.push({
	name: "Garcia's Auto Shop",
	email: 'birkusandre@gmail.com',
	phoneNumber: faker.phone.phoneNumberFormat(0),
	specialty: 'Engine Work',
	location: faker.address.streetAddress(),
})

customerSeed.push({
	email: 'vladimir.gurkot@gmail.com',
	location: faker.address.streetAddress(),
	firstName: 'Vladimir',
	lastName: 'Gurkot',
	phoneNumber: '7739876075',
})

const seed = async () => {
	console.log('trying to seed DB')
	try {
		await db.sync({force: true})
		console.log('syncing with DB')
		await Dealer.bulkCreate(dealerSeed)
		console.log('dealer bulk create')
		await Service.bulkCreate(servicesSeed)
		console.log('serivce bulk create')
		await User.create({
			email: 'cody@email.com',
			password: '123',
			isAdmin: true,
		})
		await Customer.bulkCreate(legacyCustomers)
		await Order.bulkCreate(legacyOrders)
		// const forLoop = async _ => {
		// 	console.log('Start seed')

		// 	for (let index = 0; index < legacyOrders.length; index++) {
		// 		await Order.create(legacyOrders[index])
		// 		console.log('done seeding', index)
		// 	}
		// }

		// await forLoop()

		// await Customer.bulkCreate([
		// 	{
		// 		email: 'jpreck90@gmail.com',
		// 		location: '5018 S. Woodlawn ave, Chicago IL 60615',
		// 		firstName: 'Jennifer',
		// 		lastName: 'Preckwinkle',
		// 		phoneNumber: '7738175148',
		// 	},
		// 	{
		// 		firstName: 'Anthony',
		// 		lastName: 'Di Silvestro',
		// 		location: '536 w grant place',
		// 		phoneNumber: '8479170734',
		// 		email: 'adisilvestro7994@gmail.com',
		// 	},
		// 	{
		// 		firstName: 'Michael',
		// 		lastName: 'Walus',
		// 		location: '1445 W Augusta Blvd Chicago IL 60642',
		// 		phoneNumber: '6308631745',
		// 		email: 'michael.walus@gmail.com',
		// 	},
		// 	{
		// 		firstName: 'Murad',
		// 		lastName: 'Kajani',
		// 		location: '2331 N. Sheffield Ave, Chicago, IL 60614',
		// 		phoneNumber: '6308856453',
		// 		email: 'mkajani@gmail.com',
		// 	},
		// ])
		// await Order.bulkCreate([
		// 	{
		// 		pickupDate: '2020-06-20 15:05',
		// 		dropoffDate: '2020-06-20 16:05',
		// 		pickupLocation: '5018 S. Woodlawn ave, Chicago IL 60615',
		// 		carYear: '2016',
		// 		carMake: 'Nissan',
		// 		carModel: 'Rogue',
		// 		hash: faker.random.number({min: 100000, max: 999999}), //returns 9
		// 		customerPhoneNumber: '7738175148',
		// 	},
		// 	{
		// 		pickupDate: '2020-06-21 15:05',
		// 		dropoffDate: '2020-06-21 16:05',
		// 		pickupLocation: '536 w grant place',
		// 		carYear: '2014',
		// 		carMake: 'Dodge',
		// 		carModel: 'Journey',
		// 		hash: faker.random.number({min: 100000, max: 999999}), //returns 9
		// 		customerPhoneNumber: '8479170734',
		// 	},
		// 	{
		// 		pickupDate: '2020-06-22 15:05',
		// 		dropoffDate: '2020-06-22 16:05',
		// 		pickupLocation: '1445 W Augusta Blvd Chicago IL 60642',
		// 		carYear: '2014',
		// 		carMake: 'Lincoln',
		// 		carModel: 'MKX',
		// 		hash: faker.random.number({min: 100000, max: 999999}), //returns 9
		// 		customerPhoneNumber: '6308631745',
		// 	},
		// 	{
		// 		pickupDate: '2020-06-25 15:05',
		// 		dropoffDate: '2020-06-26 15:05',
		// 		pickupLocation: '1445 W Augusta Blvd Chicago IL 60642',
		// 		carYear: '2016',
		// 		carMake: 'Mazda',
		// 		carModel: 'CX-5',
		// 		hash: faker.random.number({min: 100000, max: 999999}), //returns 9
		// 		customerPhoneNumber: '6308856453',
		// 	},
		// ])
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
