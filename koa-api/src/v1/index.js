const Router = require('koa-router');
const ytRouter = require('./youtube-download/yt');
const uploadRouter = require('./fiile-upload/index')
// const authRouter = require('./auth');

const router = new Router();

// /v1
router.get('/', async (ctx) => {
  ctx.body = '<h1>v1 router</h1>';
});

// /v1/yt/download
router.use('/yt', ytRouter.routes());

// /v1/upload/files
router.use('/upload', uploadRouter.routes());

// /v1/auth
// router.use('/auth', authRouter.routes());

module.exports = router;


