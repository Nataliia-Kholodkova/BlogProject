const express = require('express');

const router = new express.Router();
const {
  getUsers,
  getUser,
} = require('../controllers/users');

router.get('/api/users',
  (request, response) => {
    try {
      getUsers(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/users/:id',
  (request, response) => {
    try {
      getUser(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports.usersRouter = router;
