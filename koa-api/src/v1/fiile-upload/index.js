const Router = require('koa-router')
const multer = require('@koa/multer')
// const fileUpload = require('./fileupload')
// const multer = require('multer')
const upload = multer()

const router = new Router()

router.post('/file', async (ctx, next) => {
  console.log({ ctx })
  console.log('/file')
  upload.single('avatar'),
  ctx => {
    console.log('ctx.request.file', ctx.request.file)
    console.log('ctx.file', ctx.file)
    console.log('ctx.request.body', ctx.request.body)

    // ctx.status = 201
    ctx.body = "OK"
  }
})

router.get('/test', async (ctx) => {
  ctx.body = {
    status: "OK",
    msg: 'Hello'
  }
})


module.exports = router
