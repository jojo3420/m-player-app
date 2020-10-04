const express = require('express')
const youtubedl = require('youtube-dl')
const uniqueId = require('uniqid')
const fs = require('fs')

const router = express.Router()

router.post('/download', async (req, res, next) => {
  const { url, format } = req.body
  // console.log({ url, format, dirname: __dirname })
  let ext
  if (format === 'audio') {
    ext = 'mp3'
  } else {
    ext = 'mp4'
  }
  const filename = `${uniqueId('yt_')}.${ext}`

  try {
    // options
    // https://github.com/ytdl-org/youtube-dl/blob/master/README.md#readme
    const video = youtubedl(
      url,
      // Optional arguments passed to youtube-dl.
      ['--format=bestaudio[ext=mp3],worstaudio[ext=mp3],best,worst'],
      // ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      // { cwd: __dirname },
    )

    // Will be called when the download starts.
    video.on('info', function (info) {
      console.log('Download started')
      console.log('filename: ' + info['_filename'])
      console.log('size: ' + info.size)

      // 실제 파일 리얼 네임은 여기에서 조회!
      // const realFilename = info['_filename']
      // const realFileFormat = info['_filename'].split('.')[
      //   info['_filename'].split('.').length - 1
      // ]
      video.pipe(fs.createWriteStream(`public/audio/${filename}`))
    })

    const options = {
      // Downloads available thumbnail.
      all: false,
      // The directory to save the downloaded files in.
      cwd: 'public/images',
      // 작동 안됨
      // filename: 'filename.jpg',
    }
    youtubedl.getThumbs(url, options, function (err, files) {
      if (err) throw next(err)

      console.log('thumbnail file downloaded:', files)
      // console.log(files[0])

      res
        .status(201)
        .json({
          msg: 'OK',
        })
        .end()
    })
  } catch (e) {
    next(e)
  }
})

router.post('/info', async (req, res, next) => {
  const { url } = req.body

  const options = ['--username=user', '--password=hunter2']
  youtubedl.getInfo(url, options, function (err, info) {
    if (err) throw err

    console.log('id:', info.id)
    console.log('title:', info.title)
    console.log('url:', info.url)
    console.log('thumbnail:', info.thumbnail)
    console.log('description:', info.description)
    console.log('filename:', info._filename)
    console.log('format id:', info.format_id)

    res.json({
      title: info.title,
      url: info.url,
      thumbnail: info.thumbnail,
      description: info.description,
      format: info.format_id,
    })
    res.end()
  })
})

module.exports = router
