const Router = require('koa-router');
const fs = require('fs');
const youtubeDl = require('youtube-dl');
// const Audio = require('../../models/Audio');
const rand = require("random-key");



const router = new Router();

const logging = async (ctx, next) => {
  console.log({
    url: ctx.url,
    method: ctx.method,
    params: ctx.params,
    body: ctx.request.body || {}
  });
  await next();
};


// router.get('/download/video',async (ctx) => {};


// 다운로드
// NPM: https://www.npmjs.com/package/youtube-dl
router.get('/download',async (ctx) => {
  let {url, type} = ctx.request.body;
  if (!url || !type) {
    console.error('url or format are null.');
    ctx.throw(500, {});
  }
  const format = type === 'video' ? 'mp4' : 'mp3';
  const filename = `${rand.generate()}.${format}`;
  let output = `web/${filename}`;
  let downloaded = 0


  try {
    if (fs.existsSync(output)) {
      downloaded = fs.statSync(output).size
    }

    const video = await youtubeDl(url,
      // Optional arguments passed to youtube-dl.
      [`--format=${format === 'mp4' ? 'bestvideo/worstvideo' : 'bestaudio/worstaudio'}`,
        `--embed-thumbnail`,
      ],
      // Additional options can be given for calling `child_process.execFile()`.
      {start: downloaded });


    // Will be called when the download starts.
    video.on('info', function (info) {
      console.log('Download started')
      console.log('filename: ' + info['_filename'])

      // info.size will be the amount to download, add
      let total = info.size + downloaded
      console.log('size: ' + total)

      if (downloaded > 0) {
        // size will be the amount already downloaded
        console.log('resuming from: ' + downloaded)

        // display the remaining bytes to download
        console.log('remaining bytes: ' + info.size)
      }
    });

    await video.pipe(fs.createWriteStream(output, {flags: 'a'}))


    // Will be called if download was already completed and there is nothing more to download.
    video.on('complete', (info) => {
      'use strict'
      console.log('filename: ' + info['_filename'] + ' already downloaded.')
    });

    video.on('end', () => {
      console.log('finished downloading!')
    });
    const options = {
      // Downloads available thumbnail.
      all: false,
      // The directory to save the downloaded files in.
      cwd: 'web',
    }

    youtubeDl.getThumbs(url, options, function(err, files) {
      if (err) throw err;

      console.log('thumbnail file downloaded:', files)
    })

    // @TODO - save media file name

    // @TODO - save thumbnail file name



    ctx.status = 201;
    ctx.body = {
      message: 'SUCCESS',
      mediaFile: filename,
    };

  } catch (e) {
    ctx.throw(500, e)
  }
});

router.get('/info', async (ctx) => {
  let {url, type} = ctx.request.body;
  if (!url || !type) {
    console.error('url or format are null.');
    ctx.throw(500, {});
  }
  const format = type === 'video' ? 'mp4' : 'mp3';

  let obj;
  try {
    // Optional arguments passed to youtube-dl.
    const options = ['--username=user', '--password=hunter2']

    youtubeDl.getInfo(url, options, function (err, info) {
      if (err) throw err;
      obj = info;
      console.log('id:', info.id)
      console.log('title:', info.title)
      console.log('url:', info.url)
      console.log('thumbnail:', info['thumbnail'])
      console.log('description:', info['description'])
      console.log('filename:', info['_filename'])
      console.log('format id:', info['format_id'])
    });
    ctx.status = 200;
    ctx.body = "<div>information</div>";

  } catch (e) {
    ctx.throw(500, e);
  }
});


module.exports = router;
