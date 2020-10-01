// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
//
// const { Schema } = mongoose;
//
// const schema = new Schema({
//   username: String,
//   hashedPassword: String,
// });
//
// schema.methods.setPassword = async function (password) {
//   if (!password) {
//     throw new Error('password is empty..');
//   }
//   const hash = await bcrypt.hash(password, 10);
//   // console.log({ hash });
//   if (!hash) {
//     throw new Error('setPassword() => hash has not made..');
//   }
//   this.hashedPassword = hash;
// };
//
// schema.methods.checkPassword = async function (password) {
//   if (!password) {
//     throw new Error('password is empty..');
//   }
//   const result = await bcrypt.compare(password, this.hashedPassword);
//   return result; //true or false
// };
//
// schema.methods.serialize = function () {
//   const user = this.toJSON();
//   delete user.hashedPassword;
//   return user;
// };
//
// schema.methods.generateToken = function () {
//   // 1.토큰을 만드는데 넣고 싶은 데이터 ,
//   // 2. sign secret key
//   // 3. options(토큰 유효일)
//   const token = jwt.sign(
//     {
//       _id: this.id,
//       username: this.username,
//     },
//     process.env.JWT_SECRET_KEY,
//     {
//       expiresIn: '7d', // 7days
//     }
//   );
//   // console.log({ token });
//   return token;
// };
//
// schema.statics.findByUsername = async function (username) {
//   const user = await this.findOne({ username });
//   if (!user) {
//     console.error('user is empty..');
//     return null;
//   }
//   return user;
// };
//
// const User = mongoose.model('User', schema);
//
// module.exports = User;
