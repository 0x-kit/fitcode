const router = require('express').Router();
const jwt = require('../services/jwt');
const passport = require('passport');

/** GOOGLE AUTH */
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    jwt.signToken(req, res);
  }
);

/** NORMAL AUTH */
router.post(
  '/auth/local',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    jwt.signToken(req, res);
  }
);

module.exports = router;
