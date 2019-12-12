const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize(`postgres://localhost:5432/adminpage`, {
	logging: false,
})

const dbMYSQL = new Sequelize('carrectl_wp', 'carrectl_vadym', 'An;z([KBpiM3', {
	host: 'us58.siteground.us',
	port: 3306,
	dialect: 'mysql',
	logging: false,
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
})

module.exports = {db, dbMYSQL}
