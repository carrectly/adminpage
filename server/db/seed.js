const {User} = require('./models')
const db = require('./database.js')
var faker = require('faker')

let userSeed = []

for (let i = 0; i < 10; i++) {
	userSeed.push({
		email: faker.internet.email(),
		password: '123',
		shippingAddress: faker.address.streetAddress(),
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
