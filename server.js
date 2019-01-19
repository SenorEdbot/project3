const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const server = express();

// Serve static files from the React app
server.use(express.static(path.join(__dirname, 'client/build')));

// Middleware
server.use(logger('dev'));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Mongoose Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/midWaste";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
const apiRouter = require('./routes/api');
server.use('/api', apiRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Error handler
server.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = server;
