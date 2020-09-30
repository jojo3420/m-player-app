const express = require('express')
const { PlayList, Media } = require('../../models')
// Media router

const router = express.Router()

// router.get('/:id', (req, res, next) => {
//   const { id: playlistId } = req.params
//
//   try {
//     const playlist = PlayList.findAll({
//       where: { id: playlistId },
//     })
//
//     res.json({
//       status: 200,
//       playlist,
//     })
//   } catch (err) {
//     // TODO
//     console.log({ err })
//   }
// })

module.exports = router
