module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'member',
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      pw: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      username: {
        field: 'username',
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      // mobileCountryCode: {
      //   // +82: 한국,  +1: 미국, +216: 튀니지
      //   type: DataTypes.STRING(4),
      //   allowNull: true,
      // },
      emailPass: {
        field: 'email_pass',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      smsPass: {
        field: 'sms_pass',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'member',
    },
  )
}
