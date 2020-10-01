const Router = require('koa-router');
const control = require('./posts-control');
const isOwnerCheckMiddleware = require('../lib/isOwnerCheckMiddleware');

const router = new Router();

const logging = async (ctx, next) => {
  console.log({
    url: ctx.url,
    method: ctx.method,
    params: ctx.params,
    body: ctx.request.body || {},
  });
  await next();
};

const { save, list, find, update, remove, validateObjectId } = control;

router.get('/', list);
router.post('/', save);
router.get('/:id', validateObjectId, find);
router.patch('/:id', validateObjectId, isOwnerCheckMiddleware, update);
router.delete('/:id', validateObjectId, isOwnerCheckMiddleware, remove);

module.exports = router;
