const router = require('express').Router();
const DiaryController = require('../controllers/diary');
const authController = require('../controllers/auth2');

router
  .get('/:userId', authController.requireAuth, DiaryController.getDiaries)

  .get('/:diaryId', DiaryController.readDiary)

  .post('/', DiaryController.createDiary)

  .put('/:diaryId', DiaryController.updateDiary)

  .delete('/:diaryId', DiaryController.deleteDiary);

module.exports = router;
