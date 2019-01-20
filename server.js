const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/midWaste";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Error handler
app.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
