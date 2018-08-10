const router = require('express').Router();
const DiaryController = require('../controllers/diary');
const authController = require('../controllers/auth2');

const requireAuth = authController.requireAuth;

router
  .get('/:diaryId', DiaryController.readDiary)

  .post('/', DiaryController.createDiary)

  .put('/:diaryId', DiaryController.updateDiary)

  .delete('/:diaryId', DiaryController.deleteDiary)

  /** Basic crud */

  .get('/user/:userId', requireAuth, DiaryController.getDiaries)

  .post('/:diaryId/product', requireAuth, DiaryController.addProduct)

  .put('/:diaryId/product', requireAuth, DiaryController.editProduct)

  .delete('/:diaryId/product/:productId',DiaryController.deleteProduct);

module.exports = router;
