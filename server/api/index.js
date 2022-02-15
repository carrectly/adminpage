'use strict'
const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/dealers', require('./dealers'))
router.use('/customers', require('./customers'))
router.use('/services', require('./services'))
router.use('/comments', require('./comments'))
router.use('/drivers', require('./drivers'))
router.use('/cars', require('./cars'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
