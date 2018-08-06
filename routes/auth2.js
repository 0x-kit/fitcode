const router = require('express').Router();
const authController = require('../controllers/auth2');

router
  .post('/signup', authController.signup)

  .post('/signin', authController.signin)

  .get('/google', authController.goAuth)
  
  .get('/google/callback', authController.goAuthCB);

module.exports = router;
