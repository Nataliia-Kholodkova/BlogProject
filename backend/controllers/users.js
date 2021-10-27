const { User } = require('../model/models');
const { mapUser } = require('../helpers');

const getUsers = async (request, response) => {
  const { limit, skip } = request.query;
  try {
    const users = await User
      .find({ _id: { $ne: request.userId } })
      .limit(+limit ?? 0).skip(+skip ?? 0) ?? [];
    response.status(200).json({ users: Array.from(users).map((user) => mapUser(user)) });
  } catch (error) {
    response.status(400).json({ error: error.message }).end();
  }
};

const getUser = async (request, response) => {
  const { id } = request.params;
  try {
    const user = await User
      .findById(id);
    if (!user) {
      return response.status(200).json({ user: {} }).end();
    }
    return response.status(200).json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message }).end();
  }
};

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
