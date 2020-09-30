const express = require('express')
const PlayList = require('../../models').PlayList
const { Sequelize: { Op } } = require('../../models')

// Op 연산자
// ex1> where: { age: { [Op.gt]: 30 }
// gt: 초과, gte: 이상, lt:미안, lte: 이하
// ne: 같지않음, or: 또는 in: 배열 요소중 하나
// ex2> where: {
//         [Op.or]: [{married: 0], {age: {[Op.gt]: 30 } }],
//      }
// married = 30 OR age > 30

const router = express.Router()


router.get('/:email', async (req, res, next) => {
  const { email } = req.params;
  console.log({ email })
  try {
    const playlists = await PlayList.findAll({
      attributes: [
        'id', 'title', 'email', 'description',
        'avatar', 'createdAt', 'updatedAt',
      ],
      limit: 20,
      where: { email },
      order: [
        ['id', 'DESC'],
      ],
    })

    res.status = 200
    res.json({ status: 'OK', playlists })
  } catch (err) {
    console.log({ err })
  }
});


router.get('/:email/:id', async (req, res, next) => {
  // const id
  const { id } = req.params;
  try {
    const playlist = await PlayList.findOne({ where: { id } });
    res.json({
      status: 'OK',
      playlist
    })

  } catch (err) {
    console.log({ err })
  }

});

module.exports = router;
