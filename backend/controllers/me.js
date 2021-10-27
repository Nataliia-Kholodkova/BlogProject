const bcrypt = require('bcrypt');
const { User } = require('../model/models');

const getMe = async (request, response) => {
  try {
    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(400).json({ message: 'Not authenticated' });
    }
    return response.status(200).json({ user });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const updateMe = async (request, response) => {
  try {
    const {
      firstName, lastName, street, city, state, country, phone, cell,
    } = request.body;
    const user = await User.findOneAndUpdate(
      { _id: request.userId },
      {
        firstName, lastName, street, city, state, country, phone, cell,
      },
      {
        new: true,
      },
    );
    response.status(200).json({ user });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updateMePassword = async (request, response) => {
  try {
    const { oldPassword, newPassword } = request.body;
    const currentUser = await User.findOne(
      { _id: request.userId },
    );
    if (!currentUser) {
      response.status(400).json({ message: 'Invalid credentials' }).end();
      return;
    }
    const isValidPassword = await bcrypt
      .compare(oldPassword, currentUser.password);
    if (!isValidPassword) {
      response.status(400).json({ message: 'Invalid password' }).end();
      return;
    }
    currentUser.password = newPassword;
    await currentUser.save();
    response.status(200).json({ user: currentUser });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updateMePhoto = async (request, response) => {
  try {
    const { photo } = request.body;
    const user = await User.findOneAndUpdate(
      { _id: request.userId },
      { picture: { large: photo, medium: photo, thumbnail: photo } },
      {
        new: true,
      },
    );
    response.status(200).json({ user });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const deleteMe = async (request, response) => {
  try {
    await User.remove({ _id: request.userId });
    response.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

const updateSubscribeFriendMe = async (request, response) => {
  try {
    const { followedUsers } = request.body;
    await User.findOneAndUpdate(
      { _id: request.userId },
      { followedUsers },
      {
        new: true,
      },
    );
    response.status(200).json({ message: 'Success' });
  } catch (error) {
    response.status(400).json({ message: error.message }).end();
  }
};

module.exports.updateMePassword = updateMePassword;
module.exports.deleteMe = deleteMe;
module.exports.updateMe = updateMe;
module.exports.updateMePhoto = updateMePhoto;
module.exports.getMe = getMe;
module.exports.updateSubscribeFriendMe = updateSubscribeFriendMe;
