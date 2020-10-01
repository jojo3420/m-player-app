const Post = require('../models/post');
const Joi = require('joi');
const mongoose = require('mongoose');

exports.validateObjectId = async (ctx, next) => {
  const { ObjectId } = mongoose.Types;
  const { id } = ctx.params;
  const r = ObjectId.isValid(id);
  if (!r) {
    ctx.status = 400;
    ctx.body = {
      message: 'id is not mongodb objectId!',
    };
    return;
  }

  await next();
};

/**
 * Save Post
 * POST /v1/posts
 */
exports.save = async (ctx) => {
  // validate
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const { error } = Joi.validate(ctx.request.body, schema);
  if (error) {
    ctx.status = 400; // Bad Reqeust
    ctx.body = error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const { user } = ctx.state;
  console.log({ user });
  try {
    const post = new Post({
      title,
      body,
      tags,
      user,
    });
    await post.save();

    ctx.status = 201; // created
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * post list
 * GET /v1/posts?username=jojo&tag=love&page=1
 * @param ctx
 */
exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  const { username, tag } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const list = await Post.find(query)
      .sort({ _id: -1 }) // DESC
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();

    ctx.body = list.map((post) =>
      post.body.length < 200
        ? post
        : { ...post, body: `${post.splice(0, 200)}...` }
    );
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * Find by postId
 * GET /v1/posts/postId
 * @param ctx
 * @return {Promise<void>}
 */
exports.find = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: 'post is not exist.',
      };
      return;
    }

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * Modify Post content
 * PUT /v1/posts/postId
 * @param ctx
 */
exports.update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const { value, error } = Joi.validate(ctx.request.body, schema);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body, tags },
      {
        new: true,
      }
    );
    ctx.status = 202; // Accepted
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const r = await Post.findByIdAndRemove({ _id: id });
    console.log({ r });
    if (!r) {
      ctx.status = 404;
      ctx.body = {
        message: 'post is not exist.',
      };
      return;
    }
    ctx.status = 204; // no content
  } catch (e) {
    ctx.throw(500, e);
  }
};
