const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const server = express();

// Middleware
server.use(logger('dev'));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Mongoose Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/midWaste";
mongoose.connect(MONGODB_URI);

// Routes
const indexRouter = require('./routes/index');
const tempRouter = require('./routes/temp');
server.use('/', indexRouter);
server.use('/temp', tempRouter);

// Catch 404 and forward to error handler
server.use((req, res, next) => next(createError(404)));

// TODO: need to catch bad routes with '*'? (Catch 404 above might already do this)

// Error handler
server.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // TODO: render an error page (server-side) if desired
});

// TODO: move this to a routes/api file
// Testing the database creation
// const db = require('./models')
// let testObj = {
//   name: "eddie",
//   maxTimeSurvived: 7,
//   maxDifficulty: 1,
//   maxEnemiesKilled: 14,
//   maxHealth: 80,
//   maxShotsFired: 700,
//   maxAccuracy: 75,
//   historyTimeSurvived: [4, 2],
//   historyDifficulty: [1,2],
//   historyEnemiesKilled: [6, 5],
//   historyHealth: [80, 70],
//   historyShotsFired: [33, 16],
//   historyAccuracy: [45, 21],
//   friends: ['_10389382','_1038342'],
// }
// db.User.create(testObj)

module.exports = server;
