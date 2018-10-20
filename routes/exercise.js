const router = require('express').Router();
const ExerciseController = require('../controllers/exercise');

const authController = require('../controllers/auth2');
const requireAuth = authController.requireAuth;

router

  .get('/', requireAuth, ExerciseController.getExercises)

  .get('/:exerciseId', requireAuth, ExerciseController.readExercise)

  .post('/', requireAuth, ExerciseController.createExercise)

  .put('/:exerciseId', requireAuth, ExerciseController.updateExercise)

  .delete('/:exerciseId', requireAuth, ExerciseController.deleteExercise);

module.exports = router;
