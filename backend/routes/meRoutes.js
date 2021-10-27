const express = require('express');

const router = new express.Router();
const {
  updateMe,
  deleteMe,
  updateMePassword,
  updateMePhoto,
  getMe,
  updateSubscribeFriendMe,
  updateLikedPostsMe,
} = require('../controllers/me');
const {
  authUser,
} = require('../middleware/authMiddleware');

router.get('/api/users/me',
  authUser, (request, response) => {
    try {
      getMe(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/api/users/me/password',
  authUser, (request, response) => {
    try {
      updateMePassword(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.delete('/api/users/me', authUser, (request, response) => {
  try {
    deleteMe(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/api/users/me', authUser, (request, response) => {
  try {
    updateMe(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/api/users/me/photo', authUser, (request, response) => {
  try {
    updateMePhoto(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/api/users/me/updateFriends',
  authUser, (request, response) => {
    try {
      updateSubscribeFriendMe(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/api/users/me/likedPosts',
  authUser, (request, response) => {
    try {
      updateLikedPostsMe(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports.meRouter = router;
