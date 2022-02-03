const {
  User,
  Customer,
  Order,
  Service,
  Dealer,
  Driver,
  CarMakes,
} = require('./models')
const db = require('./database.js')
var faker = require('faker')
// const Sequelize = require('sequelize')
const fs = require('fs')

// const legacyOrders = JSON.parse(
// 	fs.readFileSync('./seedData/orders.json', 'utf-8')
// )
// console.log('legacy orders', legacyOrders[0])
// const legacyCustomers = JSON.parse(
// 	fs.readFileSync('./seedData/customers.json', 'utf-8')
// )
const servicesSeed = JSON.parse(fs.readFileSync('./services.json', 'utf-8'))
const carMakesSeed = JSON.parse(fs.readFileSync('./carMakesList.json', 'utf-8'))

let customerSeed = []
let dealerSeed = []

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

const legacyOrders = [
  {
    hash: '073fe68ab073ac9c59a8d497c8d35227',
    customerComments: null,
    pickupDate: null,
    dropoffDate: null,
    pickupLocation: null,
    carYear: 2019,
    carMake: 'AUDI',
    carModel: 'A',
    customerPhoneNumber: 3144893320,
    status: 'cancelled',
    // driverPickUp: 1,
  },
  {
    hash: '137a33b02af9d37db66e99e51ecb2b8f',
    customerComments: 'DELUX WASH',
    pickupDate: null,
    dropoffDate: null,
    pickupLocation: null,
    carYear: 2016,
    carMake: 'MERCEDES-BENZ',
    carModel: 'GL',
    customerPhoneNumber: 6303373753,
    status: 'booked new',
    // driverDropOff: 1,
  },
]

const legacyCustomers = [
  {
    firstName: 'Aamer',
    lastName: 'Qidwai',
    location: 60659,
    phoneNumber: 6303373753,
    email: 'AAMERINVEGAS@HOTMAIL.COM',
  },
  {
    firstName: 'Aaron',
    lastName: 'Fischer',
    location: 60616,
    phoneNumber: 3144893320,
    email: 'ARON@FACTUREGOODS.COM',
  },
]

const driversSeed = [
  {
    name: 'kyle',
    email: 'birkusandre@gmail.com',
    phoneNumber: faker.phone.phoneNumberFormat(0),
  },
]

// const servicesSeed = [
//   { name: 'AC Coolant Recharge', price: 150 },
//   { name: 'Alighnment', price: 145 },
//   { name: 'Auto Leather Repair', price: 100 },
//   { name: 'Battery Jump, Test & Swap', price: 70 },
// ]

const seed = async () => {
  console.log('trying to seed DB')
  try {
    await db.sync({ force: true })
    console.log('syncing with DB')
    await Dealer.bulkCreate(dealerSeed)
    console.log('dealer bulk created')
    await Service.bulkCreate(servicesSeed)
    console.log('serivce bulk created')
    await CarMakes.bulkCreate(carMakesSeed)
    console.log('car makes bulk created')
    await Driver.bulkCreate(driversSeed)
    console.log('drivers bulk created')
    await User.create({
      email: 'cody@email.com',
      password: '123',
      isAdmin: true,
    })
    await Customer.bulkCreate(legacyCustomers)
    console.log('Customer bulk created')
    await Order.bulkCreate(legacyOrders)
    console.log('Order bulk created')
  } catch (err) {
    console.log('Error seeding bulk file', err)
  }
}

seed()
  .then(() => {
    console.log('Seeding success!')
    db.close()
  })
  .catch((err) => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })

module.exports = seed
