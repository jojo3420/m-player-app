const express = require('express')
const upload = require('./fileupload')
const { Media, PlayList } = require('../../models/')

const router = express.Router()

router.post('/upload', upload.single('file'), (req, res) => {
  // FormData의 경우 req로 부터 데이터를 얻을수 없다.
  // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다

  const { originalname, filename, size, mimetype } = req.file
  // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
  // @TODO PlayList 에 포함시켜야..
  Media.create({
    email: 'jjjhhhvvv@naver.com',
    filename: filename,
    originalFilename:
      originalname.length > 200 ? originalname.substr(0, 200) : originalname,
    mimetype,
    size,
  })
  return res.json({ success: 'OK', cnt: 1 })
})

router.post('/uploads', upload.array('files', 10), (req, res) => {
  // FormData의 경우 req로 부터 데이터를 얻을수 없다.
  // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다
  const { files } = req
  // console.log({ req })
  console.log(files)
  if (files && files.length > 0) {
    files.forEach(({ originalname, filename, mimetype, size }) => {
      Media.create({
        email: 'jjjhhhvvv@naver.com',
        filename: filename,
        originalFilename:
          originalname.length > 200
            ? originalname.substr(0, 200)
            : originalname,
        mimetype,
        size,
      })
    })
    return res.json({ status: 'OK', cnt: req.files.length })
  } else {
    return res.json({ status: 'NONE', cnt: req.files.length })
  }
})

module.exports = router
