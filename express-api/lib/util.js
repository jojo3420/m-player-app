const _ = require('lodash')

function generatorRandom(length) {
  let random = ''
  _.times(length, () => {
    random += _.random(0, 9)
  })

  return random
}

module.exports = {
  generatorRandom,
}
