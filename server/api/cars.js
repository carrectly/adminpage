const router = require('express').Router()
const { CarMakes } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router
const defaultStringCompareOptions = { sensitivity: 'base' }

router.get('/getAllMakes', async (req, res, next) => {
  try {
    const makes = await CarMakes.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Make')), 'car_make'],
      ],
    })

    let makesResponse = makes.map((singleBrand) => {
      return singleBrand.dataValues.car_make
    })
    makesResponse.sort((a, b) =>
      a.localeCompare(b, defaultStringCompareOptions)
    )
    res.json(makesResponse)
  } catch (err) {
    next(err)
  }
})

router.get('/getModels/:make/:year', async (req, res, next) => {
  try {
    const models = await CarMakes.findAll({
      where: {
        [Op.and]: [{ Year: req.params.year }, { Make: req.params.make }],
      },
    })
    res.json(models)
  } catch (err) {
    next(err)
  }
})
