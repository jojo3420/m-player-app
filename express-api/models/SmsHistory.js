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
      status: {
        // 0: 전송 후 매칭X, 2: 사용완료 , 9: 비장상 처리
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
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
