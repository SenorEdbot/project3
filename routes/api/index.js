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

router.get('/test', (req, res) => {
  db.User.create(testObj)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err))
})

module.exports = router;

// TEMP DEV REFERENCE
let testObj = {
  name: "eddieTester",
  maxTimeSurvived: 7,
  maxDifficulty: 8,
  maxEnemiesKilled: 14,
  maxShotsFired: 700,
  maxAccuracy: 75,
  recentTimeSurvived: 6,
  recentDifficulty: 4,
  recentEnemiesKilled: 2,
  recentShotsFired: 700,
  recentAccuracy: 75,
  historyTimeSurvived: [4, 2, 6, 7, 3],
  historyDifficulty: [1,2, 4, 5, 6],
  historyEnemiesKilled: [6, 5, 13, 6, 8],
  historyShotsFired: [33, 16, 44, 200, 455],
  historyAccuracy: [45, 21, 85, 45, 67],
  friends: ['_10389382','_1038342', '_1068453', '_1098275', '_1065412'],
}
