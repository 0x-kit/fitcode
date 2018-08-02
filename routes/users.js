const UsersController = require('../controllers/user');
const router = require('express').Router();

router
  .get('/', UsersController.getUsers)
  .get('/:userId', UsersController.readUser)
  .post('/', UsersController.createUser)
  .put('/:userId', UsersController.updateUser)
  .delete('/:userId', UsersController.deleteUser)

  .get('/:userId/goals', UsersController.getGoals);

module.exports = router;
