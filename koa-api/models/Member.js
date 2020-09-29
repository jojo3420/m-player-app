
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('member', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    pw: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'member'
  });
}



