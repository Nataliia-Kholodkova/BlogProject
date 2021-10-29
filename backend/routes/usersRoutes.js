const express = require('express');

const { authUser } = require('../middleware/authMiddleware');

const router = new express.Router();
const {
  getUsers,
  getUser,
  getFollowedUsers,
} = require('../controllers/users');

router.get('/api/users',
  (request, response) => {
    try {
      getUsers(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/users/followed',
  authUser, (request, response) => {
    try {
      getFollowedUsers(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/users/:id',
  authUser, (request, response) => {
    try {
      getUser(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports.usersRouter = router;
