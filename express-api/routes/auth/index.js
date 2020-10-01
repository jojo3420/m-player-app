const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { Member } = require('../../models')
const ctrl = require('./auth-control')

const router = express.Router()

// router.post('/', async (req, res, next) => {
//   const { email, pw } = req.body
//   console.log({ email })
//   try {
//     const member = await Member.findOne({
//       attributes: ['id', 'email', 'username', 'mobile', 'createdAt'],
//       where: {
//         email,
//         pw,
//       },
//     })
//     res.json({
//       status: 200,
//       member,
//     })
//   } catch (err) {
//     console.log({ err })
//   }
// })

// router.get('/test', (req, res) => {
//   res.body = '<h1>/v1/auth/test</h1>'
// })

const debugging = async (req, res, next) => {
  const o = {
    method: req.method,
    path: req.path,
    params: req.params || {},
    query: req.query || {},
    body: req.body || {},
  }

  console.log({ o })
  await next()
}

const { signUp, signIn, logout, check } = ctrl

const signUpSchema = Joi.object({
  email: Joi.string().required(),
  pw: Joi.string().required(),
  mobile: Joi.string().required(),
  username: Joi.string().required(),
})

// validator.query(signUpSchema)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/logout', logout)
router.get('/check', check)

module.exports = router
