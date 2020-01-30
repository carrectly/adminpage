const router = require('express').Router()
const Sequelize = require('sequelize')
const {Comment} = require('../db/models')

module.exports = router

router.get('/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid
		const cmts = await Comment.findAll({
			where: {
				orderHash: id,
			},
			order: [['createdAt', 'DESC']],
		})
		res.json(cmts)
	} catch (err) {
		next(err)
	}
})

router.post('/:orderid', async (req, res, next) => {
	try {
		let id = req.params.orderid
		let cmt = await Comment.create({
			content: req.body.content,
			orderHash: id,
		})
		res.json(cmt)
	} catch (err) {
		next(err)
	}
})
