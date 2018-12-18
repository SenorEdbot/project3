const router = require('express').Router(); // eslint-disable-line new-cap
const UserController = require('../../controllers/UserController');

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
