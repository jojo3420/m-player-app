const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = require(configPath)[env];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require('./Member')(sequelize, Sequelize);
db.PlayList = require('./PlayList')(sequelize, Sequelize);

// 멤버와 플레이리스트 1:N 관계
db.Member.hasMany(db.PlayList);
db.PlayList.belongsTo(db.Member);

module.exports = db;
