const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const ctrl = require('./auth-control')
// const { Member } = require('../../models')
const hasTokenMiddleware = require('../../lib/hasTokenMiddleware')

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

const { isAvailableEmail, signUp, signIn, logout, check } = ctrl

const signUpSchema = Joi.object({
  email: Joi.string().required(),
  pw: Joi.string().required(),
  username: Joi.string().required(),
  mobile: Joi.string().required(),
})

const signInSchema = Joi.object({
  email: Joi.string().required(),
  pw: Joi.string().required(),
})

router.post('/signup', validator.body(signUpSchema), signUp)
router.post('/available', validator.body(signInSchema), isAvailableEmail)
router.post('/signin', validator.body(signInSchema), signIn)
router.post('/logout', hasTokenMiddleware, logout)
router.get('/check', hasTokenMiddleware, check)

module.exports = router
