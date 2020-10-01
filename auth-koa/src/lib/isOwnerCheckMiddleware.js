const Post = require('../models/post');

const isOwnerCheckMiddleware = async (ctx, next) => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const post = await Post.findOne({ _id: id });
  if (post.user._id.toString() !== user._id.toString()) {
    ctx.status = 403;
    ctx.body = {
      message: '해당 요청에 대한 권한이 없습니다.',
      id,
    };
    return;
  }
  await next();
};

module.exports = isOwnerCheckMiddleware;
