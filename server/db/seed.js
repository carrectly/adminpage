const {User, Customer, Service, Dealer} = require('./models')
const db = require('./database.js')
var faker = require('faker')
const Sequelize = require('sequelize')

let customerSeed = []
let userSeed = []
let serviceSeed = [
	{name: 'AC Coolant Recharge', price: 150},
	{name: 'Alighnment', price: 140},
	{name: 'Battery Test and Replacement', price: 55},
	{name: 'Brake Fluid Flush', price: 150},
	{name: 'Brake Pads & Rotors Replacement', price: 440},
	{name: 'Brake Pads Replacement', price: 260},
	{name: 'Car Unlock', price: 420},
	{name: 'Ceramic Coating & Paint Correction', price: 1300},
	{name: 'Chauffeur', price: 25},
	{name: 'Deluxe Wash', price: 35},
	{name: 'Dog Hair', price: 30},
	{name: 'Emission Test', price: 55},
	{name: 'Engine Detail', price: 55},
	{name: 'Exterior Detail', price: 160},
	{name: 'FREE Quote', price: 0},
	{name: 'Fuel up', price: 10},
	{name: 'Full Inspection', price: 100},
	{name: 'Headlight Restoration', price: 80},
	{name: "Independent Shops' Estimate", price: 60},
	{name: 'Interior Detail', price: 160},
	{name: 'Jump Start', price: 250},
	{name: 'Jump Start & Battery Replacement', price: 240},
	{name: 'Labor Cost', price: 120},
	{name: 'Long-Haul Transit', price: 500},
	{name: 'Long-Term Vehicle Storage', price: 70},
	{name: 'Miscellaneous', price: 0},
	{name: 'One Way Transport', price: 40},
	{name: 'Paint Correction', price: 500},
	{name: 'Paintless Dent Removal', price: 100},
	{name: 'Panel Repaint', price: 400},
	{name: 'PPF Full Car', price: 3000},
	{name: 'PPF Full Front', price: 1500},
	{name: 'PPF half Front', price: 650},
	{name: 'Problem Diagnostics', price: 60},
	{name: 'Protective Plastic Floor Wrap', price: 4},
	{name: 'Recall & Dealership Run', price: 65},
	{name: 'Regular Maintenance', price: 280},
	{name: 'Roundtrip Transport', price: 70},
	{name: 'Shampoo Floor Mats', price: 20},
	{name: 'Short-Term Vehicle Storage', price: 15},
	{name: 'Showroom Detail', price: 260},
	{name: 'Small Part Replacement', price: 60},
	{name: 'Spiff / Light Detail', price: 120},
	{name: 'Stickers & Adhesive Removal', price: 5},
	{name: 'Synthetic Oil Change', price: 110},
	{name: 'Tar Removal', price: 25},
	{name: 'Tint', price: 380},
	{name: 'Tint Removal', price: 25},
	{name: 'Tire Balancing', price: 20},
	{name: 'Tire Fix', price: 55},
	{name: 'Tire Installation', price: 20},
	{name: 'Tire Rotation', price: 90},
	{name: 'Tire Storage', price: 100},
	{name: 'TPMS', price: 120},
	{name: 'TPMS Sensor Replacement', price: 120},
	{name: 'Transmission Fluid Flush', price: 225},
	{name: 'Wash & Wax', price: 80},
	{name: 'Wax', price: 40},
	{name: 'Wet Sand', price: 20},
	{name: 'Wheel & Tire Storage', price: 120},
	{name: 'Wheel Restoration', price: 150},
	{name: 'Wheel Welding', price: 80},
	{name: 'Wiper Blade Replacement', price: 140},
	{name: 'Wrap', price: 2500},
]

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
	specialty: faker.commerce.productName(),
	location: faker.address.streetAddress(),
})

for (let i = 0; i < 6; i++) {
	dealerSeed.push({
		name: faker.commerce.productName(),
		email: 'birkusandre@gmail.com',
		phoneNumber: faker.phone.phoneNumberFormat(0),
		specialty: faker.commerce.productName(),
		location: faker.address.streetAddress(),
	})
}

customerSeed.push({
	email: 'vladimir.gurkot@gmail.com',
	location: faker.address.streetAddress(),
	firstName: 'Vladimir',
	lastName: 'Gurkot',
	phoneNumber: '7739876075',
})

const seed = async () => {
	try {
		await db.sync({force: true})
		await Dealer.bulkCreate(dealerSeed)
		await Service.bulkCreate(serviceSeed)
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
