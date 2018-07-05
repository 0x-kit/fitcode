const router = require('express').Router();
const Authentication = require('../controllers/auth2');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(422).json({ message: req.authError });

    req.user = user;
    next();
  })(req, res, next);
};

const requireSigninGoogle = passport.authenticate('google', { session: false });
const requireAuthGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

router
  .post('/signup', Authentication.signup)
  .post('/signin', requireSignin, Authentication.signin)

  .get('/google', requireAuthGoogle)
  .get('/google/callback', requireSigninGoogle, Authentication.signin)

  .get('/feature', function(req, res) {
    res.send({ message: 'Protected route' });
  })
  .get('/', requireAuth, function(req, res) {
    res.send({ message: 'Protected route' });
  });

module.exports = router;
