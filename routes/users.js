const router = require('express').Router();
const UsersController = require('../controllers/user');

const authController = require('../controllers/auth2');
const requireAuth = authController.requireAuth;

router
  .get('/', requireAuth, UsersController.getUsers)

  .get('/:userId', requireAuth, UsersController.readUser)

  .post('/', requireAuth, UsersController.createUser)

  .put('/:userId', requireAuth, UsersController.updateUser)

  .delete('/:userId', requireAuth, UsersController.deleteUser)

  .get('/:userId/products', requireAuth, UsersController.getRecentProducts)

  .get('/:userId/goals', UsersController.getGoals)

  .get('/:userId/exercise', requireAuth, UsersController.getExercises)

  .get('/:userId/recipe', requireAuth, UsersController.getRecipes)

  .get('/:userId/history', requireAuth, UsersController.getHistory)

  .put('/:userId/macros', requireAuth, UsersController.setMacros)

  .put('/:userId/currentweight', requireAuth, UsersController.setCurrentWeight)

  .put('/:userId/goalweight', UsersController.setGoalWeight);

module.exports = router;
