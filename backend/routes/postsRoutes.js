const express = require('express');

const router = new express.Router();
const {
  getPosts,
  getUsersPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  updatePostLikes,
  getLikedPosts,
} = require('../controllers/posts');
const { authUser, isCommentOwner, isPostOwner } = require('../middleware/authMiddleware');

router.get('/api/posts',
  (request, response) => {
    try {
      getPosts(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/posts/liked',
  authUser, (request, response) => {
    try {
      getLikedPosts(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/user/posts/:id',
  (request, response) => {
    try {
      getUsersPosts(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/api/posts',
  authUser, (request, response) => {
    try {
      createPost(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/posts/:id',
  (request, response) => {
    try {
      getPostById(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/api/posts/:id',
  authUser,
  isPostOwner,
  (request, response) => {
    try {
      updatePost(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/api/posts/updateLike/:id',
  authUser,
  (request, response) => {
    try {
      updatePostLikes(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.delete('/api/posts/:id',
  authUser,
  isPostOwner,
  (request, response) => {
    try {
      deletePost(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/api/comments/:id',
  authUser,
  (request, response) => {
    try {
      createComment(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/api/comments/:id',
  authUser,
  isCommentOwner,
  (request, response) => {
    try {
      updateComment(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.delete('/api/comments/:id',
  authUser,
  isCommentOwner,
  (request, response) => {
    try {
      deleteComment(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports.postsRouter = router;
