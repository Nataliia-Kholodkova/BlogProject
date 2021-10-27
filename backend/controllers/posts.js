const { Post, Comment, User } = require('../model/models');
const {
  addUserToPost, getComments, getComment,
} = require('../helpers');

const getPosts = async (request, response) => {
  const { limit, skip } = request.query;
  try {
    const posts = await Post.find().sort([['publishDate', -1]]).limit(+limit ?? 0).skip(+skip ?? 0) ?? [];
    const mappedPosts = await addUserToPost(posts);
    response.status(200).json({ posts: mappedPosts });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const getUsersPosts = async (request, response) => {
  const { limit, skip } = request.query;
  const { id } = request.params;
  try {
    const posts = await Post.find({ ownerUid: id })
      .sort([['publishDate', -1]])
      .limit(+limit ?? 0).skip(+skip ?? 0) ?? [];
    const mappedPosts = await addUserToPost(posts);
    response.status(200).json({ posts: mappedPosts });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const createPost = async (request, response) => {
  const {
    image, tags, text,
  } = request.body;
  try {
    const post = await Post.create({
      likes: 0, tags, text, publishDate: new Date(), ownerUid: request.userId,
    });
    if (image) {
      post.image = image;
    }
    await post.save();
    response.status(200).json({ post });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const getPostById = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findById(id);
    const user = await User.findById(post.ownerUid);
    const comments = await getComments(post);
    response
      .status(200)
      .json({ post: { ...post._doc, user, comments } });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updatePost = async (request, response) => {
  const {
    image, tags, text,
  } = request.body;
  const { id } = request.params;
  try {
    const post = await Post.findOneAndUpdate({ _id: id }, { image, tags, text }, { new: true });
    response.status(200).json({ post });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updatePostLikes = async (request, response) => {
  const {
    like,
  } = request.body;
  const { id } = request.params;
  try {
    const post = await Post.findById(id);
    post.likes += +like;
    await post.save();
    const user = await User.findById(request.userId);
    let { likedPosts } = user;
    if (+like === -1) {
      likedPosts = likedPosts.filter((currentPost) => currentPost !== id);
    } else {
      likedPosts.push(id);
    }
    user.likedPosts = likedPosts;
    await user.save();
    response.status(200).json({ message: 'Success' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const deletePost = async (request, response) => {
  const { id } = request.params;
  try {
    await Post.remove({ _id: id });
    response.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const createComment = async (request, response) => {
  const { message } = request.body;
  const { id } = request.params;
  try {
    const comment = await Comment.create({
      message, publishDate: new Date(), ownerUid: request.userId, postUid: id,
    });
    const user = await getComment(comment);
    response.status(200).json({ comment: { ...comment._doc, user } });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updateComment = async (request, response) => {
  const { message } = request.body;
  const { id } = request.params;
  try {
    const comment = await Comment.findOneAndUpdate({ _id: id }, { message }, { new: true });
    const user = await getComment(comment);
    response.status(200).json({ comment: { ...comment._doc, user } });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const deleteComment = async (request, response) => {
  const { id } = request.params;
  try {
    await Comment.remove({ _id: id });
    response.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
module.exports.getPostById = getPostById;
module.exports.updatePost = updatePost;
module.exports.updatePostLikes = updatePostLikes;
module.exports.deletePost = deletePost;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
module.exports.getUsersPosts = getUsersPosts;
