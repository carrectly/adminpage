const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'salt', 'googleId', 'token'] },
      order: [['firstName', 'ASC']],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
// 	try {
// 		let newuser = req.body
// 		const users = await User.create({
// 			email: 'cody@email.com',
// 			password: '123',
// 			isAdmin: true,
// 			shippingAddress: faker.address.streetAddress(),
// 		})
// 		res.json(users)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.put('/:userid', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.userid,
      },
      returning: true,
    })

    res.json(user[1][0].dataValues)
  } catch (error) {
    next(error)
  }
})

const onlyAdmins = (req, res, next) => {
  if (!req.user) {
    console.log('USER IS NOT LOGGED IN!')
    return res.sendStatus(401)
  }
  if (!req.user.isAdmin) {
    console.log('USER LOGGED IN BUT NOT AN ADMIN!')
    return res.sendStatus(401)
  }
  next()
}

router.delete('/:id', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.id
    await User.destroy({
      where: { id },
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/admin/:userid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.userid
    const user = await User.findByPk(id)
    let adminStatus
    if (!user.isAdmin) {
      adminStatus = true
    } else {
      adminStatus = false
    }
    await user.update({ isAdmin: adminStatus })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/reset/:userid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.userid
    const user = await User.findByPk(id)
    await user.update({ resetPassword: true })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
