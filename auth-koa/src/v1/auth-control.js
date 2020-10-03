const { Member } = require('../../models');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPw(password) {
  if (!password) {
    throw new Error('password is empty..');
  }
  const hash = await bcrypt.hash(password, 10);
  if (!hash) {
    throw new Error('setPassword() => hash has not made..');
  }
  return hash;
}

function serialize(member) {
  const memberJSON = member.toJSON();
  delete memberJSON.pw;
  return memberJSON;
}

function generateToken(email, username) {
  // 1.토큰을 만드는 데 넣고 싶은 데이터 ,
  // 2. sign secret key
  // 3. options(토큰 유효일)
  const token = jwt.sign(
    {
      email,
      username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7d', // 7days
    }
  );
  console.log({ token });
  return token;
}

const checkPw = async function (pw, hashedPw) {
  if (!pw) {
    throw new Error('password is empty..');
  }
  const result = await bcrypt.compare(pw, hashedPw);
  return result; //true or false
};

/**
 * Register auth
 * @param ctx
 * @return {Promise<void>}
 */
exports.signUp = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    pw: Joi.string().required(),
    mobile: Joi.string().required(),
    username: Joi.string().required(),
  });
  const { error } = Joi.validate(ctx.request.body, schema);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const { email, pw, mobile, username } = ctx.request.body;
  console.log({ email, pw, mobile, username });

  // email 중복 검사
  const alreadyMember = await Member.findOne({
    where: { email },
  });
  if (alreadyMember) {
    ctx.status = 402;
    ctx.body = {
      message: '이미 등록된 email 주소 입니다',
      email,
    };
    return;
  }

  try {
    const hashedPw = await hashPw(pw);
    console.log({ hashedPw });
    const member = await Member.create({
      email,
      pw: hashedPw,
      mobile,
      username,
    });
    console.log({ member });

    const token = generateToken(email, pw);
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    ctx.status = 201;
    ctx.body = {
      status: 'OK',
      msg: 'created',
      member: serialize(member),
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.signIn = async (ctx) => {
  const { email, pw } = ctx.request.body;

  try {
    const member = await Member.findOne({
      where: { email },
    });
    if (!member) {
      ctx.status = 401;
      ctx.body = {
        msg: '회원 이메일를 찾을 수 없습니다.',
        email,
      };
      return;
    }

    const check = await checkPw(pw, member.pw);
    if (!check) {
      ctx.status = 401;
      ctx.body = {
        msg: '비밀번호 불일치',
        pw,
      };
      return;
    }

    ctx.body = serialize(member);

    const token = generateToken(email, pw);
    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.logout = async (ctx) => {
  try {
    ctx.cookies.set('access_token', '');
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.check = async (ctx) => {
  try {
    const { user } = ctx.state;
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        message: '로그인 상태가 아닙니다.',
      };
      return;
    }
    ctx.status = 200;
    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e);
  }
};
