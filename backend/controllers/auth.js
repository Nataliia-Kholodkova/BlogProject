const jwt = require('jsonwebtoken');
const { User } = require('../model/models');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const signUp = async (request, response) => {
  const {
    email, password, firstName, lastName, gender,
  } = request.body;
  try {
    await User.create({
      email,
      password,
      firstName,
      lastName,
      gender,
    });
    response.status(200).json({ message: 'Profile created successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const signIn = async (request, response) => {
  try {
    const { email } = request.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      response.status(400).json({ message: 'Invalid email' }).end();
      return;
    }
    const token = createToken(currentUser._id);
    response.cookie('jwt', token, { httpOnly: true });
    request.userId = currentUser._id;
    response.status(200).json({ user: currentUser });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const signOut = async (request, response) => {
  try {
    response.cookie('jwt', '', { maxAge: 1 });
    request.userId = null;
    response.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
