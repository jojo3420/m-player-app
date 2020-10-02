const { Media, PlayList } = require('../../models/')
const fs = require('fs')
const mime = require('mime')

const singleUpload = (req, res) => {
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
  res.json({ success: 'OK', cnt: 1 })
}

const multiUpload = (req, res) => {
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
}

const readAudio = async (req, res, next) => {
  // const path = 'public/audio/01-sample.mp3'
  const { path } = req.body
  const mimeType = mime.getType(path)
  fs.readFile(path, (error, data) => {
    if (error) {
      res.json({ error })
    }
    console.log({ data })
    res.set('Content-Type', mimeType)
    res.end(data)
  })
}

const readMedia = async (req, res, next) => {
  const { path } = req.body
  const mimeType = mime.getType(path)
  console.log({ mimeType: mimeType })

  const stream = fs.createReadStream(path)
  let count = 0

  stream.on('data', (data) => {
    count += 1
    // console.log({ count })
    res.write(data)
  })

  stream.on('end', () => {
    console.log('end streaming')

    // 4.1. 클라이언트에 전송완료를 알림
    res.end()
  })
}

module.exports = {
  singleUpload,
  multiUpload,
  readMedia,
  readAudio,
}
