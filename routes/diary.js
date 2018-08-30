const router = require('express').Router();
const DiaryController = require('../controllers/diary');
const authController = require('../controllers/auth2');

const requireAuth = authController.requireAuth;

router

  .get('/user/:userId', DiaryController.getDiaries)

  .post('/:diaryId/product', requireAuth, DiaryController.addProduct)

  .put('/:diaryId/product', requireAuth, DiaryController.editProduct)

  .delete('/:diaryId/product/:productId', DiaryController.deleteProduct);

module.exports = router;
