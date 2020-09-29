const Koa = require('koa');
const Router = require('koa-router');
const dotEnv = require('dotenv');
const bodyParser = require('koa-bodyparser');
// const serve = require('koa-static');
const serve = require('koa-static-server');
const sequelize = require('../models/index').sequelize;
const v1Router = require('./v1/index');
const path = require('path');

// const hasTokenMiddleware = require('./lib/hasTokenMiddleware');



dotEnv.config();
const port = process.env.PORT || 4000;


const app = new Koa();

// MySQL DB Connect
sequelize.sync();

const router = new Router();


app.use(serve({ rootDir: 'web', rootPath: '/web'}));

// basic router
router.get('/', async (ctx) => {
  ctx.body = '<div>youtube download api!</div>';
});

// dirname: '/Users/jhnoru/Programmer/sourcetree-git/js/node-js/koa-api/src'
// use library
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// sub router
router.use('/v1', v1Router.routes());


app.use((ctx) => {
  ctx.status = 404;
  ctx.body = {
    message: 'not found!'
  }
})


// listen server
app.listen(port, () => {
  console.log('server is listening ' + port);
});




