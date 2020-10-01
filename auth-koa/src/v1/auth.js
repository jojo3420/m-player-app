const Router = require('koa-router');
const ctrl = require('./auth-control');

const router = new Router();

const debugging = async (ctx, next) => {
  const o = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params || '',
    query: ctx.query || '',
  };

  console.log({ o });
  await next();
};

router.get('/test', (ctx) => {
  ctx.body = '<h1>/v1/auth/test</h1>';
});

const { signUp, signIn, logout, check } = ctrl;

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', logout);
router.get('/check', check);

module.exports = router;
