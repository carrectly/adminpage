const router = require('express').Router()
const {Driver} = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const result = await Driver.findAll({
			order: [['name', 'DESC']],
		})
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		let id = Number(req.params.id)
		const oneDealer = await Driver.findOne({
			where: {
				id: id,
			},
		})
		res.json(oneDealer)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const drvr = await Driver.create(req.body)
		res.json(drvr)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		await Driver.destroy({
			where: {id},
		})
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		const drvr = await Driver.findByPk(id)
		const newdlr = await drvr.update(req.body)
		res.json(newdlr)
	} catch (err) {
		next(err)
	}
})

module.exports = router
