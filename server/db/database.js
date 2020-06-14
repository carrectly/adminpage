const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
	process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
	{
		logging: console.log,
	}
)

//const dbMYSQL = null

// const dbMYSQL = new Sequelize('carrectl_wp', 'carrectl_vadym', 'An;z([KBpiM3', {
// 	host: 'us58.siteground.us',
// 	port: 3306,
// 	dialect: 'mysql',
// 	logging: false,
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		idle: 10000,
// 	},
// })

module.exports = db

if (process.env.NODE_ENV === 'test') {
	after('close database connection', () => db.close())
}
