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
    where: { mobile: to.replace(/-/g, '') },
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
          status: 0, // 0: 요청, 2:인증완료, 9: 비정상
        })
        res.status(200).json({
          msg: 'SEND_OK',
          server: await hashPw(random),
          // dev: random,
        })
      }
    } catch (e) {
      next(e)
    }
  }
})

module.exports = router
