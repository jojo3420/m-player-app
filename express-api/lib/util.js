const _ = require('lodash')
const { PlayList } = require('../models')

function generatorRandom(length) {
  let random = ''
  _.times(length, () => {
    random += _.random(0, 9)
  })

  return random
}

function transformToInnerList(list, split = 4) {
  const newList = []
  const count = Math.ceil(list.length / split)

  for (let i = 0; i < count; i++) {
    const innerList = list.splice(0, split)
    newList.push(innerList)
  }

  return newList
}

function initDB(cnt = 0) {
  _.range(cnt).map((index) => {
    PlayList.create({
      title: 'my story#' + index,
      email: `$user-{index}@test.com`,
      created: new Date(),
      updated: new Date(),
      memberId: 1,
    })
  })
}

module.exports = {
  generatorRandom,
  transformToInnerList,
  initDB,
}
