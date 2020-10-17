const { PlayList, Member } = require('../../models')
const { transformToInnerList } = require('../../lib/util')

const perItemCnt = 28

const getPlayListBy = async (req, res, next) => {
  let { email, page } = req.params
  // console.log({ email })
  if (!page) page = 1

  try {
    const member = await Member.findOne({
      attributes: ['id', 'email'],
      where: { email },
    })
    // console.log({ member })
    if (!member) {
      res.status(404).json({
        msg: 'NOT_FOUND_USER',
        playList: [],
      })
      return
    }
    const playlist = await member.getPlayLists({
      attributes: ['id', 'title', 'email', 'description', 'avatar'],
      limit: perItemCnt,
      offset: parseInt(page, 10) * perItemCnt,
      order: [['id', 'DESC']],
    })
    // console.log({ playlist })
    res.status(200).json({
      status: 'OK',
      playlist: transformToInnerList(playlist, 4),
    })
  } catch (err) {
    console.error({ err })
    next(err)
  }
}

const createPlayList = async (req, res, next) => {
  const { id, title, description, email, avatar } = req.body
  // console.log({ title, description, email, avatar })
  try {
    // const member = await Member.findOne({
    //   attributes: ['id', 'email'],
    //   where: { email },
    // })
    // console.log({ member })
    const playList = await PlayList.create({
      title,
      description,
      email,
      avatar,
    })
    playList.setMember(id)

    res.status(201).json({
      msg: 'OK',
    })
  } catch (e) {
    next(e)
  }
}

const modifyPlayListBy = async (req, res, next) => {
  // id is playlist id
  const { id, title, description, avatar } = req.body
  // console.log({ id, title, description, avatar })
  const item = { title, description, avatar }
  console.log({ item })
  for (let key in item) {
    if (!item[key]) {
      delete item[key]
    }
  }
  console.log({ after: item })
  try {
    const playlist = await PlayList.update(item, {
      where: { id },
    })
    console.log({ playlist })

    if (!playlist) {
      res.status(404).json({
        msg: "playlist can't found! ",
      })
      return
    }

    res.status(201).json({
      msg: 'OK',
    })
  } catch (e) {
    next(e)
  }
}

const deletePlayListBy = async (req, res, next) => {
  const { id } = req.params
  console.log({ id: parseInt(id, 10) })
  try {
    if (!id) {
      res.status(404).json({
        msg: 'id is required.',
      })
      return
    }

    // @TODO: 연결된 미디어 파일도 모두 삭제 해야 함
    const count = await PlayList.destroy({
      where: { id: parseInt(id, 10) },
    })

    res.json({
      msg: 'DELETE',
      count,
    })
  } catch (e) {
    next(e)
  }
}

const imageUpload = async (req, res, next) => {
  const { originalname, filename, size, mimetype } = req.file
  const { email, title, description } = req.body
  // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
  // console.log({ originalname, filename, size, mimetype })

  try {
    const playlist = await PlayList.create({
      email,
      title,
      description,
      avatar: filename,
    })
    // TODO: 이미지 메타데이터 저장 필요.
    // originalname, size, mimetype,

    // console.log({ playlist })
    res.status(201).json({ msg: 'CREATED', cnt: 1, playlist })
  } catch (e) {
    console.error({ e })
    next(e)
  }
}

const getPlayList = async (req, res, next) => {
  const { id: playlistID } = req.params
  try {
    const playlist = await PlayList.findOne({ where: { id: playlistID } })

    // @TODO - media
    // console.log('media: ', playlist.getMedias({}))
    res.json({
      status: 'OK',
      album: playlist,
      mediaList: [1, 2, 3],
    })
  } catch (err) {
    console.error({ err })
    next(err, req, res, next)
  }
}

module.exports = {
  getPlayListBy,
  getPlayList,
  createPlayList,
  modifyPlayListBy,
  deletePlayListBy,
  imageUpload,
}
