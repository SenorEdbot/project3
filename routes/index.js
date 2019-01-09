const express = require('express');
const router = express.Router();

// Get home page (server)
// Note: this won't be need and can probably be deleted.
router.get('/', function(req, res, next) {
  res.send('Midwaste server root directory.');
});

module.exports = router;
