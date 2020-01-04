const router = require('express').Router()
const {Service} = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const result = await Service.findAll()
		res.json(result)
	} catch (err) {
		next(err)
	}
})

module.exports = router
