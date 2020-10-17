const multer = require('multer')
// const moment = require('moment');
const rand = require('random-key')
const path = require('path')

const audioPath = `public${path.sep}audio`
const imgPath = `public${path.sep}images`
// const _path = 'your path. ex)/Users/jhnoru/Programmer/data'
// const _path = `D:${path.sep}data${path.sep}`

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log({ req, file, cb })
    cb(null, audioPath) // 파일이 저장되는 경로입니다.
  },
  filename: function (req, file, cb) {
    // 저장되는 파일명
    // console.log({ length: file.originalname.length })
    const format = file.originalname.split('.')
    cb(null, `${rand.generate()}.${format[format.length - 1]}`)
  },

  /* <= byte 단위:  60MB */
  limits: { fileSize: 60000000 },
})

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log({ req, file, cb })
    cb(null, imgPath) // 파일이 저장되는 경로입니다.
  },
  filename: function (req, file, cb) {
    // 저장되는 파일명
    // console.log({ length: file.originalname.length })
    const format = file.originalname.split('.')
    cb(null, `${rand.generate()}.${format[format.length - 1]}`)
  },

  /* <= byte 단위:  60MB */
  limits: { fileSize: 60000000 },
})

// single : 하나의 파일업로드 할때
// const upload = multer({ storage: storage }).single("file");
// const uploads = multer({ storage: storage }).array("files", 12);
const audioUpload = multer({ storage: audioStorage })
const imageUpload = multer({ storage: imageStorage })

module.exports = {
  audioUpload,
  imageUpload,
}
