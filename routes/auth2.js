const router = require('express').Router();
const authController = require('../controllers/auth2');

router
  .post('/signup', authController.signup)
  .post('/signin', authController.signin)

  .get('/google', authController.goAuth)
  .get('/google/callback', authController.goAuthCB)

  .get('/feature', function(req, res) {
    res.send({ message: 'Protected route' });
  })

  .get('/', authController.requireAuth, function(req, res) {
    res.send({ message: 'Protected route' });
  });

module.exports = router;

// const requireSignin = (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(422).json({ message: req.authError });

//     req.user = user;
//     next();
//   })(req, res, next);
// };
