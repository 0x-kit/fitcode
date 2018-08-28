const router = require('express').Router();
const ExerciseController = require('../controllers/exercise');

router

  .get('/', ExerciseController.getExercises)

  .get('/:exerciseId', ExerciseController.readExercise)

  .post('/', ExerciseController.createExercise)

  .put('/:exerciseId', ExerciseController.updateExercise)

  .delete('/:exerciseId', ExerciseController.deleteExercise);

module.exports = router;
