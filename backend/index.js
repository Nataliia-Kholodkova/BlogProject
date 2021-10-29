const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { dataBase } = require('./config');
const { authRouter } = require('./routes/authRoutes');
const { meRouter } = require('./routes/meRoutes');
const { postsRouter } = require('./routes/postsRoutes');
const { usersRouter } = require('./routes/usersRoutes');

const PORT = process.env.PORT || 8080;

const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json({ limit: '50mb' }));
expressApp.use(express.urlencoded({ limit: '50mb' }));
expressApp.use(morgan('dev'));
expressApp.use(express.static(`${__dirname}/build`));

try {
  mongoose.connect(dataBase.uri).then(() => expressApp.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
  }));
} catch (error) {
  console.log('Cannot connect to DB');
}

expressApp.use('/', authRouter);
expressApp.use('/', meRouter);
expressApp.use('/', usersRouter);
expressApp.use('/', postsRouter);
expressApp.get('*', (request, response) => response.sendFile(`${__dirname}/build/index.html`));
