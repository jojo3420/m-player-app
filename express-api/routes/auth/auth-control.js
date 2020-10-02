const { Member } = require('../../models')
const {
  hashPw,
  generateToken,
  serialize,
  checkPw,
} = require('../../lib/auth-helper')

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
    where: { email },
  })
  if (alreadyMember) {
    res.status = 402
    res.json({
      message: 'email 이 중복 입니다.',
      email,
    })
    return
  }

  try {
    const hashedPw = await hashPw(pw)

    const member = await Member.create({
      email,
      pw: hashedPw,
      mobile,
      username,
    })

    const token = generateToken(email)
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    })

    res.status = 201
    res.json({
      status: 'OK',
      msg: 'created',
      member: serialize(member),
    })
  } catch (e) {
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
      res.status = 401
      res.json({
        msg: '회원 이메일를 찾을 수 없습니다.',
        email,
      })
      return
    }

    const check = await checkPw(pw, member.pw)
    if (!check) {
      res.status = 401
      res.json({
        msg: '비밀번호 불일치',
        // pw,
      })
      return
    }

    const token = generateToken(email)
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    res.json(serialize(member))
  } catch (e) {
    next(e)
  }
}

exports.logout = async (req, res, next) => {
  try {
    res.cookie('access_token', '')
    res.status = 204
    res.end()
  } catch (e) {
    next(e)
  }
}

exports.check = async (req, res, next) => {
  console.log({ state: req.body })
  try {
    // @TODO
    let member = {}
    // const { member } = req.locals
    // console.log({ member })
    if (!member) {
      res.status = 400
      res.json({
        message: '로그인 상태가 아닙니다.',
      })
      return
    }
    res.status = 200
    res.json(member)
  } catch (e) {
    next(e)
  }
}
