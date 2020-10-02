const express = require('express')
const upload = require('./fileupload')
const {
  singleUpload,
  multiUpload,
  readMedia,
  readAudio,
} = require('./upload-control')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const router = express.Router()

router.post('/upload', upload.single('file'), singleUpload)
router.post('/uploads', upload.array('files', 10), multiUpload)

const schema = Joi.object({
  path: Joi.string().required(),
})
router.post('/read/media', validator.body(schema), readMedia)
router.post('/read/audio', validator.body(schema), readAudio)

module.exports = router
