const { Member } = require('../../models')
const {
  hashPw,
  generateToken,
  serialize,
  checkPw,
} = require('../../lib/auth-helper')

exports.isAvailableEmail = async (req, res, next) => {
  const { email, pw } = req.body
  //1. 사용 가능한 이메일,
  // 2. 회원정보 있음.
  // =>  a. 패스워드 일치 및 sms 인증 안된 회원 정보 => 인즌진행,
  // =>  b. 인증 완료된 회원 정보 있음 => 가입불가,

  // email 중복 검사
  const member = await Member.findOne({
    attributes: ['email', 'pw', 'smsPass'],
    where: { email },
  })
  // console.log({ member })
  if (!member) {
    res.status(200).json({
      msg: 'PASS',
    })
  } else {
    const check = await checkPw(pw, member.pw)
    if (member && check && !member['smsPass']) {
      res.status(403).json({
        msg: 'sms 인증을 진행해주세요.',
        email,
      })
    } else if (member && check && member['smsPass']) {
      res.status(403).json({
        msg: '사용중인 이메일 주소 입니다. ',
        email,
      })
    } else {
      res.status(403).json({
        msg: '비정상적인 접근입니다.',
      })
    }
  }
}

/**
 * Register auth
 * @param
 * @return {Promise<void>}
 */
exports.signUp = async (req, res, next) => {
  const { email, pw, mobile, username } = req.body
  console.log({ email, pw, mobile, username })

  // email 중복 검사
  const alreadyMember = await Member.findOne({
    where: { email, mobile },
  })
  // console.log({ alreadyMember })
  if (alreadyMember) {
    res.status(402).json({
      msg: '이메일 또는 휴대폰 번호가 중복 입니다.',
      email,
      mobile,
    })
  }

  try {
    const hashedPw = await hashPw(pw)
    const member = await Member.create({
      email,
      pw: hashedPw,
      mobile,
      username,
      smsPass: true,
    })
    const token = generateToken(member)
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 유지 기간 7days
      httpOnly: true,
    })
    res.status(201).json({
      status: 'OK',
      msg: 'created',
      member: serialize(member),
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
}

exports.signIn = async (req, res, next) => {
  const { email, pw } = req.body
  try {
    const member = await Member.findOne({
      where: { email },
    })
    if (!member) {
      res.status(401).json({
        msg: '가입 되지 않은 이메일 입니다.',
        email,
      })
      return
    }

    const check = await checkPw(pw, member.pw)
    if (!check) {
      res.status(401).json({
        msg: '비밀번호가 불일치 하였습니다.',
      })
      return
    }

    const token = generateToken(member)
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
    })

    res.json(serialize(member))
  } catch (e) {
    next(e)
  }
}

exports.logout = async (req, res, next) => {
  try {
    res.cookie('access_token', '')
    res.clearCookie('access_token')
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

exports.check = async (req, res, next) => {
  try {
    const { auth } = res.locals
    // console.log({ auth })
    if (!auth) {
      res.status = 400
      res.json({
        msg: '로그인 상태가 아닙니다.',
      })
      return
    }
    res.status = 200
    res.json(auth)
  } catch (e) {
    next(e)
  }
}
