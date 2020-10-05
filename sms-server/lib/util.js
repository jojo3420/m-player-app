const _ = require("lodash");
const bcrypt = require("bcrypt");

function generatorRandom(length) {
  let random = "";
  _.times(length, () => {
    random += _.random(0, 9);
  });

  return random;
}

async function hash(certificationNo) {
  const hashed = await bcrypt.hash(certificationNo, 10);
  return hashed;
}

module.exports = {
  generatorRandom,
  hash,
};
