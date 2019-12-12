const router = require('express').Router()
const {dbMYSQL} = require('../db/database')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
	try {
		console.log('Inside Order api route')
		const orders = await dbMYSQL.query('SELECT * FROM wp_users', {
			type: Sequelize.QueryTypes.SELECT,
		})
		console.log('WP USERS', orders)
		res.json(orders)
	} catch (err) {
		next(err)
	}
})
