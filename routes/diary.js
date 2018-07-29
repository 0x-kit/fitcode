const router = require('express').Router();
const DiaryController = require('../controllers/diary');

router
  .get('/:userId', DiaryController.getDiaries)

  .get('/:diaryId', DiaryController.readDiary)

  .post('/', DiaryController.createDiary)

  .put('/:diaryId', DiaryController.updateDiary)

  .delete('/:diaryId', DiaryController.deleteDiary);

module.exports = router;
