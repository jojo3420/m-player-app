module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'playList',
    {
      title: {
        filed: 'title',
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        filed: 'email',
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      description: {
        field: 'description',
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      avatar: {
        filed: 'avatar',
        type: DataTypes.STRING(25),
        allowNull: true,
      },
    },
    {
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
      tableName: 'playlist',
    },
  )
}
