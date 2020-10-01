const jwt = require('jsonwebtoken');

const hasTokenMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    return next();
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log({ decoded });
    if (decoded) {
      ctx.state.user = decoded;
      return next();
    }
  } catch (e) {
    console.error(e);
    ctx.throw(500, e);
  }
};

module.exports = hasTokenMiddleware;
