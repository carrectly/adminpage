const { CarMakes } = require('./models')
const db = require('./database.js')
const fs = require('fs')

const carMakesSeed = JSON.parse(fs.readFileSync('./carMakesList.json', 'utf-8'))

const seedCars = async () => {
  console.log('trying to seed DB')
  try {
    await db.sync()
    console.log('syncing with DB')
    await CarMakes.bulkCreate(carMakesSeed)
    console.log('car makes bulk created')
  } catch (err) {
    console.log('Error seeding bulk file', err)
  }
}

seedCars()
  .then(() => {
    console.log('Seeding success!')
    db.close()
  })
  .catch((err) => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })

module.exports = seedCars
