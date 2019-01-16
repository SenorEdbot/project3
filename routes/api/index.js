const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get all users
router.get('/users', (req, res) => {
  db.User.find({})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

// Create a new user
router.post('/users', (req, res) => {
  db.User.create(req.body)
  .then(dbUser => res.json(dbUser))
  .catch(err => res.json(err));
});

module.exports = router;
