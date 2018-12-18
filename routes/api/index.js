const router = require('express').Router(); // eslint-disable-line new-cap
const userRoutes = require('./users');
router.use('/users', userRoutes);

module.exports = router;
