const Router = require('koa-router');
const ytRouter = require('./yt');
// const authRouter = require('./auth');

const router = new Router();

// /v1
router.get('/', async (ctx) => {
  ctx.body = '<h1>v1 router</h1>';
});

// /v1/download
router.use('/yt', ytRouter.routes());
// /v1/auth
// router.use('/auth', authRouter.routes());

module.exports = router;


