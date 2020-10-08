const express = require('express')
const { generatorRandom } = require('../../lib/util')
const { Member, SmsHistory } = require('../../models')
const axios = require('axios')
const { hashPw } = require('../../lib/auth-helper')

const router = express.Router()

/* GET home page. */
router.post('/send', async function (req, res, next) {
  const { to, type } = req.body
  // console.log({ to, type })

  const member = await Member.findOne({
    where: { mobile: to },
  })
  // console.log({ member })

  if (member) {
    res.status(403).json({
      msg: '이미 등록된 휴대폰 번호입니다.',
    })
    return
  } else {
    const random = generatorRandom(6)
    const message = `[PlayList-M] SMS 인증번호: ${random}`
    const data = JSON.stringify({
      to,
      message,
    })
    const config = {
      method: 'post',
      url: 'http://15.165.176.142:4001/sms/send',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }
    try {
      // Request sms module
      const response = await axios(config)
      // console.log({ response })
      if (response && response.data.msg === 'SEND_OK') {
        // save log to DB
        await SmsHistory.create({
          to,
          certificationNo: random,
          log: message,
        })
        res.status(200).json({
          msg: response.data.msg,
          server: await hashPw(random),
          // @TODO REMOVE dev
          dev: random,
        })
      }
    } catch (e) {
      next(e)
    }
  }
})

module.exports = router
