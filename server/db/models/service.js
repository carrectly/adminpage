const Sequelize = require('sequelize')
const db = require('../database')

const Service = db.define('service', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  description: Sequelize.TEXT,
})

module.exports = Service
