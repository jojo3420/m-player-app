
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('media', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    artist: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    originalFilename: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(25),
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
    tableName: 'media'
  });
}

