const express = require('express')
const { generatorRandom } = require('../../lib/util')
const { Member } = require('../../models')
// const axios = require('axios')
const https = require('https')
const qs = require('querystring')
const { hashPw } = require('../../lib/auth-helper')

const router = express.Router()

/* GET home page. */
router.post('/send', async function (req, res, next) {
  // TODO: 모바일 중복 확인
  const { to, type } = req.body
  console.log({ to, type })

  const member = await Member.findOne({
    where: { mobile: to },
  })
  console.log({ member })

  if (member) {
    res.status(403).json({
      msg: '이미 등록된 휴대폰 번호입니다.',
    })
  } else {
    const random = generatorRandom(6)
    try {
      // await requestSMS(to, random)

      res.status(200).json({
        msg: 'SEND',
        server: await hashPw(random),
        // @TODO REMOVE dev
        dev: random,
      })
    } catch (e) {
      next(e)
    }
  }
})

const requestSMS = async (to, random) => {
  const options = {
    method: 'POST',
    hostname: 'sms.gabia.com',
    path: '/api/send/sms',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: '',
    },
  }
  const postData = qs.stringify({
    phone: to,
    callback: '15444370',
    message: 'SMS TEST MESSAGE => ' + random,
    refkey: 'RESTAPITEST1547771538',
  })

  const req = await https.request(options, (res) => {
    const chunks = []

    res.on('data', (chunk) => {
      chunks.push(chunk)
    })
    res.on('end', (err) => {
      if (err) console.log({ err })
      console.log('send end...')
    })
  })

  req.write(postData)
  req.end()
}

module.exports = router
