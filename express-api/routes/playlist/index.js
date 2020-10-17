const express = require('express')
const {
  getPlayListBy,
  getPlayList,
  createPlayList,
  modifyPlayListBy,
  deletePlayListBy,
  imageUpload,
} = require('./control')
const { imageUpload: upload } = require('../upload/fileupload')

// const { PlayList } = require('../../models')
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

/**
 *  1> 플레이리스트 조회
 */
router.get('/:email/:page', getPlayListBy)

/**
 * 2>  플레이 리스트 생성 - Create
 */
router.post('/', upload.single('file'), imageUpload)

/**
 * 3. 플레이리트스 내용 수정
 *  title, description, avatar
 */
router.patch('/', modifyPlayListBy)

/**
 * 4. 플레이리스트 전체 삭제 by playlistID
 */
router.delete('/:id', deletePlayListBy)

router.get('/:id', getPlayList)

module.exports = router
