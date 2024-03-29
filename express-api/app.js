const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sequelize = require('./models').sequelize
const cors = require('cors')
require('dotenv').config()

// const hasTokenMiddleware = require('./lib/hasTokenMiddleware')
const indexRouter = require('./routes/index')
const playlistRouter = require('./routes/playlist')
const authRouter = require('./routes/auth')
const uploadRouter = require('./routes/upload')
const smsRouter = require('./routes/sms')
const ytDownloadRouter = require('./routes/youtube-download')

// const { initDB } = require('./lib/util')
// initDB(300)

const app = express()
sequelize.sync()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// use middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// use router middleware
app.use('/', indexRouter)
app.use('/file', uploadRouter) // hasTokenMiddleware
app.use('/playlist', playlistRouter)
app.use('/auth', authRouter)
app.use('/sms', smsRouter)
app.use('/yt', ytDownloadRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
