const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize(`postgres://localhost:5432/adminpage`, {
	logging: false,
})

const dbMYSQL = new Sequelize('puppies', 'root', '12345678', {
	host: `localhost`,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
})

module.exports = {db, dbMYSQL}

// dbMYSQL
// 	.authenticate()
// 	.then(function(err) {
// 		console.log('Connection to puppies has been established successfully.')
// 	})
// 	.catch(function(err) {
// 		console.log('Unable to connect to puppies the database:', err)
// 	})

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
	after('close database connection', () => db.close())
}
