const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const server = express();

// Middleware
server.use(logger('dev'));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

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

module.exports = server;
