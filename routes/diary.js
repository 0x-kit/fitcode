const router = require('express').Router();
const DiaryController = require('../controllers/diary');

const authController = require('../controllers/auth2');
const requireAuth = authController.requireAuth;

router

  .get('/:diaryId', requireAuth, DiaryController.readDiary)

  .get('/user/:userId', requireAuth, DiaryController.getDiaries)

  .post('/:diaryId/product', requireAuth, DiaryController.addProduct)

  .put('/:diaryId/product', requireAuth, DiaryController.editProduct)

  .delete('/:diaryId/product/:productId', requireAuth, DiaryController.deleteProduct)

  .post('/:diaryId/recipe', requireAuth, DiaryController.addRecipe)

  .put('/:diaryId/recipe', requireAuth, DiaryController.editRecipe)

  .delete('/:diaryId/recipe/:recipeId', requireAuth, DiaryController.deleteRecipe);

module.exports = router;
