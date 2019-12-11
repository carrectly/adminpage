const Sequelize = require('sequelize')
const {dbMYSQL} = require('../database')

var Pup = dbMYSQL.define('pup', {
	name: {
		type: Sequelize.STRING,
	},
	age: {
		type: Sequelize.INTEGER,
	},
})

// force: true will drop the table if it already exists
// Pup.sync({force: true}).then(function() {
// 	// Table created
// 	return Pup.create({
// 		name: 'Rocky',
// 		age: 13,
// 	})
// })

module.exports = Pup
