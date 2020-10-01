const Router = require('koa-router');
// const postsRouter = require('./posts');
const authRouter = require('./auth');

const router = new Router();

// /v1
router.get('/', async (ctx) => {
  ctx.body = '<h1>V1 router</h1>';
});

// /v1/posts
// router.use('/posts', postsRouter.routes());

/* /v1/auth */
router.use('/auth', authRouter.routes());

module.exports = router;
