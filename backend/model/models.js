/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    gender: {
      type: String,
      default: 'male',
    },
    firstName: {
      type: String,
      required: [true, 'Firstname is missing'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is missing'],
    },
    street: {
      number: {
        type: Number,
      },
      name: {
        type: String,
      },
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is missing'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is missing'],
    },
    phone: {
      type: String,
    },
    cell: {
      type: String,
    },
    picture: {
      large: {
        type: String,
      },
      medium: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
    likedPosts: [{
      type: String,
    }],
    followedUsers: [{
      type: String,
    }],
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this._update.password, salt);
    this._update.password = hashed;
  }
  next();
});

const PostSchema = new Schema({
  image: {
    type: String,
  },
  likes: {
    type: Number,
  },
  tags: [{
    type: String,
  }],
  text: {
    type: String,
    required: [true, 'Text is missing'],
  },
  publishDate: {
    type: String,
  },
  ownerUid: {
    type: String,
    required: [true],
  },
});

const CommentSchema = new Schema({
  message: {
    type: String,
  },
  postUid: {
    type: String,
    required: [true],
  },
  publishDate: {
    type: String,
  },
  ownerUid: {
    type: String,
    required: [true],
  },
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
