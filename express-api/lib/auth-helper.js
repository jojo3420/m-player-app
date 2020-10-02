const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function hashPw(password) {
  if (!password) {
    throw new Error('password is empty..')
  }
  const hash = await bcrypt.hash(password, 10)
  if (!hash) {
    throw new Error('setPassword() => hash has not made..')
  }
  return hash
}

function serialize(member) {
  const memberJSON = member.toJSON()
  delete memberJSON.pw
  return memberJSON
}

function generateToken(email) {
  // 1.토큰을 만드는 데 넣고 싶은 데이터 ,
  // 2. sign secret key
  // 3. options(토큰 유효일)
  // console.log({ key: process.env.JWT_SECRET_KEY })
  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7d', // 7days
    },
  )
  return token
}

async function checkPw(pw, hashedPw) {
  if (!pw) {
    throw new Error('password is empty..')
  }
  const result = await bcrypt.compare(pw, hashedPw)
  return result //true or false
}

module.exports = {
  hashPw,
  serialize,
  generateToken,
  checkPw,
}
