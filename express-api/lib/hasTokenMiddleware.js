const jwt = require('jsonwebtoken')

const hasTokenMiddleware = async (req, res, next) => {
  const token = req.cookies['access_token']
  // console.log({ token })
  if (!token) {
    return next({
      message: 'noPermissions',
      status: 401,
    })
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    // console.log({ decoded })
    if (decoded) {
      res.locals.auth = decoded
      return next()
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = hasTokenMiddleware
