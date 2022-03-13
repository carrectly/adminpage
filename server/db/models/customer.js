const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')

const Customer = db.define('customer', {
  phoneNumber: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  isInGoogle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

if (process.env.ENVIRONMENT === 'PRODUCTION') {
  const createInGoogle = async (inst) => {
    try {
      inst.isInGoogle = true
      await axios.post(
        `${process.env.DOMAIN}/auth/google/contacts`,
        inst.dataValues
      )
    } catch (err) {
      console.log('Failed to create a contact in google', err.message)
    }
  }

  Customer.afterCreate(createInGoogle)
}

module.exports = Customer
