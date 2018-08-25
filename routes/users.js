const UsersController = require('../controllers/user');
const router = require('express').Router();

router
  .get('/', UsersController.getUsers)

  .get('/:userId', UsersController.readUser)

  .post('/', UsersController.createUser)

  .put('/:userId', UsersController.updateUser)

  .delete('/:userId', UsersController.deleteUser)

  /** Basic crud */

  .get('/:userId/goals', UsersController.getGoals)


  // .get('/:userId/currentweight', UsersController.getCurrentWeight)

  .put('/:userId/macros', UsersController.setMacros)

  .put('/:userId/currentweight', UsersController.setCurrentWeight)

  .put('/:userId/goalweight', UsersController.setGoalWeight);

module.exports = router;
