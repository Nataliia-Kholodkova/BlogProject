require('dotenv').config();

const dataBase = {
  uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster.vkgaw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
};

module.exports.dataBase = dataBase;
