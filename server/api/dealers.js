const router = require('express').Router()
const {Dealer} = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const result = await Dealer.findAll({
			order: [['id', 'ASC']],
		})
		res.json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		let id = Number(req.params.id)
		const oneDealer = await Dealer.findOne({
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
		const dealer = await Dealer.create(req.body)
		res.json(dealer)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		await Dealer.destroy({
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
		const dealer = await Dealer.findByPk(id)
		const newdlr = await dealer.update(req.body)
		res.json(newdlr)
	} catch (err) {
		next(err)
	}
})

module.exports = router
