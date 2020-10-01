const Koa = require('koa');
const Router = require('koa-router');
const dotEnv = require('dotenv');
const bodyParser = require('koa-bodyparser');
const sequelize = require('../models').sequelize;

const v1Router = require('./v1/index');
const hasTokenMiddleware = require('./lib/hasTokenMiddleware');

dotEnv.config();
const port = process.env.PORT || 4001;

// DB Connect
sequelize.sync();

const app = new Koa();
const router = new Router();

// basic router
router.get('/', async (ctx) => {
  ctx.body = '<h1>Auth Koa Server</h1>';
});

// use library
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// sub router

router.use('/v1', hasTokenMiddleware, v1Router.routes());

app.use((ctx) => {
  ctx.status = 404;
  ctx.body = {
    message: 'Page Not Found!',
  };
});

// listen server
app.listen(port, () => {
  console.log('server is listening ' + port);
});
