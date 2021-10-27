const { Comment, User } = require('./model/models');

const mapUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  picture: user.picture?.medium ?? user.picture?.large ?? null,
  gender: user.gender,
});

const getPost = async (post) => {
  try {
    const user = await User.findById(post.ownerUid);
    if (!user) {
      return null;
    }
    return { ...post._doc, user: mapUser(user) };
  } catch (error) {
    return null;
  }
};

const addUserToPost = async (posts) => {
  const mapped = await Promise.all(posts.map((post) => getPost(post)));
  return mapped;
};

const getComments = async (post) => {
  try {
    const comments = Array.from(await Comment.find({ postUid: post._id.toString() }));
    const mapped = await Promise.all(comments.map(async (comment) => {
      const user = await User.findById(comment.ownerUid);
      return { ...comment._doc, user: mapUser(user) };
    }));
    return mapped;
  } catch (error) {
    return null;
  }
};

const getComment = async (comment) => {
  const user = await User.findById(comment.ownerUid);
  return mapUser(user);
};

module.exports.mapUser = mapUser;
module.exports.addUserToPost = addUserToPost;
module.exports.getComments = getComments;
module.exports.getComment = getComment;
