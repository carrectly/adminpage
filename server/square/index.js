'use strict'
const router = require('express').Router()

router.use('/customers', require('./customers'))
router.use('/invoices', require('./invoices'))

router.use((req, res, next) => {
	const err = new Error('API route not found!')
	err.status = 404
	next(err)
})

module.exports = router
