const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  maxTimeSurvived: {
    type: Number,
    required: false
  },
  maxDifficulty: {
    type: Number,
    required: false
  },
  maxEnemiesKilled: {
    type: Number,
    required: false
  },
  maxShotsFired: {
    type: Number,
    required: false
  },
  maxAccuracy: {
    type: Number,
    required: false
  },
  recentTimeSurvived: {
    type: Number,
    required: false
  },
  recentDifficulty: {
    type: Number,
    required: false
  },
  recentEnemiesKilled: {
    type: Number,
    required: false
  },
  recentShotsFired: {
    type: Number,
    required: false
  },
  recentAccuracy: {
    type: Number,
    required: false
  },
  historyTimeSurvived: {
    type: Array,
    required: false
  },
  historyDifficulty: {
    type: Array,
    required: false
  },
  historyEnemiesKilled: {
    type: Array,
    required: false
  },
  historyShotsFired: {
    type: Array,
    required: false
  },
  historyAccuracy: {
    type: Array,
    required: false
  },
  friends: {
    type: Array,
    required: false
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
