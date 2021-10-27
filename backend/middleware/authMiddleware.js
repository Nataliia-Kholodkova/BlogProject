/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, Comment, Post } = require('../model/models');

const isValidPassword = async (request, response, next) => {
  const { email, password } = request.body;
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    return response.status(400).json({ message: 'Invalid email' }).end();
  }
  const validPassword = await bcrypt
    .compare(password, currentUser.password);
  if (!validPassword) {
    return response.status(400).json({ message: 'Invalid password' }).end();
  }
  next();
};

const authUser = async (request, response, next) => {
  const token = request?.cookies?.jwt;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return response.status(400).json({ message: 'Invalid token' });
      }
      request.userId = user._id;
      next();
    } catch (error) {
      return response.status(400).json({ message: 'Invalid token' });
    }
  } else {
    return response.status(400).json({ message: 'No token' });
  }
};

const isPostOwner = async (request, response, next) => {
  const { id } = request.params;
  const post = await Post.findById(id);
  if (post.ownerUid !== request.userId.toString()) {
    return response.status(400).json({ message: 'Post does not belong to user' }).end();
  }
  next();
};

const isCommentOwner = async (request, response, next) => {
  const { id } = request.params;
  const comment = await Comment.findById(id);
  if (comment.ownerUid !== request.userId.toString()) {
    return response.status(400).json({ message: 'Comment does not belong to user' }).end();
  }
  next();
};

const getCurrentUser = async (request, response, next) => {
  const token = request?.cookies?.jwt;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        next();
      }
      request.userId = user._id;
      next();
    } catch (error) {
      return response.status(400).json({ message: 'Invalid token' });
    }
  } else {
    return response.status(400).json({ message: 'No token' });
  }
};

module.exports.isValidPassword = isValidPassword;
module.exports.authUser = authUser;
module.exports.isPostOwner = isPostOwner;
module.exports.isCommentOwner = isCommentOwner;
module.exports.getCurrentUser = getCurrentUser;
