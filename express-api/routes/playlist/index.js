const express = require('express')
const { PlayList, Member } = require('../../models')
const {
  Sequelize: { Op },
} = require('../../models')

// Op 연산자
// ex1> where: { age: { [Op.gt]: 30 }
// gt: 초과, gte: 이상, lt:미안, lte: 이하
// ne: 같지않음, or: 또는 in: 배열 요소중 하나
// ex2> where: {
//         [Op.or]: [{married: 0], {age: {[Op.gt]: 30 } }],
//      }
// married = 30 OR age > 30

const router = express.Router()

// 플레이리스트 조회
router.get('/:email', async (req, res, next) => {
  const { email } = req.params
  console.log({ email })
  try {
    const member = await Member.findOne({
      attributes: ['id', 'email'],
      where: { email },
    })
    // console.log({ member })
    if (!member) {
      res.status(200).json({
        playList: [],
      })
      return
    }
    const playlist = await member.getPlayLists({
      attributes: ['id', 'title', 'email', 'description', 'avatar'],
      limit: 20,
      order: [['id', 'DESC']],
    })
    res.status(200).json({ status: 'OK', playlist })
  } catch (err) {
    console.log({ err })
    next(err)
  }
})

// 플레이 리스트 생성
router.post('/', async (req, res, next) => {
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
})

// 플레이리트스 수정
router.patch('/', async (req, res, next) => {
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
})

router.delete('/:id', async (req, res, next) => {
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
})

// router.get('/:email/:id', async (req, res, next) => {
//   // const id
//   const { id } = req.params
//   try {
//     const playlist = await PlayList.findOne({ where: { id } })
//     // console.log('media: ', playlist.getMedias({}))
//     res.json({
//       status: 'OK',
//       playlist,
//     })
//   } catch (err) {
//     next(err, req, res, next)
//   }
// })
//

module.exports = router
