const express = require('express');

const router = new express.Router();

const { signUp, signIn, signOut } = require('../controllers/auth');
const { isValidPassword, authUser } = require('../middleware/authMiddleware');

router.post('api/auth/signup', (request, response) => {
  try {
    signUp(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/api/auth/signin', isValidPassword, (request, response) => {
  try {
    signIn(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/api/auth/signout', authUser, (request, response) => {
  try {
    signOut(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports.authRouter = router;
