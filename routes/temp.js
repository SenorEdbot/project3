const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  // Send dummy data for testing
  res.send([
    {id: 1, name: 'tempData 1'},
    {id: 2, name: 'tempData 2'},
    {id: 3, name: 'tempData 3'}
  ]);
});

module.exports = router;
