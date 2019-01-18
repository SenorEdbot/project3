const express = require('express');
const router = express.Router();
const db = require('../../models');

// TODO: add a users controller to handle db functions?

// Get all users
router.get('/users', (req, res) => {
  db.User.find({})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

// Get user by username
router.get('/users/:username', (req, res) => {
  db.User.findOne({ name: req.params.username })
  .then(dbUser => res.json(dbUser))
  .catch(err => res.json(err));
});

// Create/update a user
router.post('/users/:username', (req, res) => {
  const condition = { name: req.params.username };

  db.User.findOneAndUpdate(condition, req.body, { upsert: true })
  .then(dbUser => res.json(dbUser))
  .catch(err => res.json(err));
});

module.exports = router;

/* TEMP DEV REFERENCE
let testObj = {
  name: "eddie",
  maxTimeSurvived: 7,
  maxDifficulty: 1,
  maxEnemiesKilled: 14,
  maxHealth: 80,
  maxShotsFired: 700,
  maxAccuracy: 75,
  historyTimeSurvived: [4, 2],
  historyDifficulty: [1,2],
  historyEnemiesKilled: [6, 5],
  historyHealth: [80, 70],
  historyShotsFired: [33, 16],
  historyAccuracy: [45, 21],
  friends: ['_10389382','_1038342'],
}
*/
