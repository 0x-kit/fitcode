const UsersController = require('../controllers/user');
const router = require('express').Router();

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.readUser);

router.post('/', UsersController.createUser);

router.patch('/:userId', UsersController.updateUser);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router;
