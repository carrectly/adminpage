const router = require('express').Router();
const { Service } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const result = await Service.findAll({
      order: [['name', 'ASC']],
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let newService = req.body;
    const result = await Service.create(newService);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put('/:serviceid', async (req, res, next) => {
  try {
    const id = req.params.serviceid;
    const service = await Service.findByPk(id);
    const newService = await service.update(req.body);
    res.json(newService);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
