module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'smsHistory',
    {
      from: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      to: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      certificationNo: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      log: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: 'sms_history',
    },
  )
}
