const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'

const configPath = path.join(__dirname, '..', 'config', 'config.json')
const config = require(configPath)[env]

const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)
db.sequelize = sequelize
db.Sequelize = Sequelize

db.Member = require('./Member')(sequelize, Sequelize)
db.Media = require('./Media')(sequelize, Sequelize)
db.PlayList = require('./PlayList')(sequelize, Sequelize)

// 멤버와 플레이리스트 1:N 관계
db.Member.hasMany(db.PlayList)
db.PlayList.belongsTo(db.Member)

// 플레이리스트 & 미디어파일 관게 => N: M 관계
db.PlayList.belongsToMany(db.Media, { through: 'playlist_media' })
db.Media.belongsToMany(db.PlayList, { through: 'playlist_media' })

module.exports = db
