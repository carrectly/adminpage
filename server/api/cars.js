const router = require('express').Router()
const { CarMakes } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/getAllMakes', async (req, res, next) => {
  try {
    const makes = await CarMakes.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Make')), 'car_make'],
      ],
      order: [['Make', 'ASC']],
    })

    const makesResponse = makes.map((singleBrand) => {
      return singleBrand.dataValues.car_make
    })
    res.json(makesResponse)
  } catch (err) {
    next(err)
  }
})

router.get('/getModels/:make/:year', async (req, res, next) => {
  try {
    // returning models for all years because database is flawed
    //  does not have all the models for each year
    const models = await CarMakes.findAll({
      where: {
        [Op.and]: [{ Make: req.params.make }],
      },
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Model')), 'car_model'],
      ],
      order: [['Model', 'ASC']],
    })
    res.json(models)
  } catch (err) {
    next(err)
  }
})
