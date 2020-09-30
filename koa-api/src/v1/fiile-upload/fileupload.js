const multer = require('multer')
const moment = require('moment')
const fs = require('fs');

const format = 'YYYYMMDD'
try {
  const dir = fs.readFileSync('/uploads')
} catch (e) {
  fs.mkdirSync('/uploads')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads') // file save path
  },
  filename: (req, file, cb) => {
    // 저장되는 파일명

    cb(null, `${moment().format(format)}_${file.originalname}`)
  },
})

const multiUpload = multer({ storage }).array('files')

module.exports = multiUpload;


