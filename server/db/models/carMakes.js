const db = require('../database')
const Sequelize = require('sequelize')

const CarMakes = db.define('carMakes', {
  objectId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Year: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  Make: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Model: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Category: {
    type: Sequelize.STRING,
  },
})

module.exports = CarMakes
