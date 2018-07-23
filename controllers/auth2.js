const User = require('../models/user');
const passport = require('passport');

exports.requireAuth = passport.authenticate('jwt', { session: false });

exports.signin = function(req, res) {
  console.log('sign in controller');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(401).json(err);
    }

    if (!user) {
      return res.status(422).json({ message: req.authError });
    } else {
      const token = user.generateJwt();
      res.send({ token: token });
    }
  })(req, res);
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // See if a user with the given email exist
    const user = await User.findOne({ email: email });

    if (user) return res.status(422).json({ message: 'Email is in use.' });

    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    await newUser.save();
    const token = newUser.generateJwt();
    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err.message });
  }
};

exports.goAuth = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email']
    // state: ''
  })(req, res, next);
};

exports.goAuthCB = (req, res, next) => {
  passport.authenticate('google', (err, user, info) =>
    generateTokenAndRedirect(req, res, next, err, user, info)
  )(req, res, next);
};

const generateTokenAndRedirect = (req, res, next, err, user, info) => {
  if (err) {
    return next(err);
  }
  if (user) {
    const token = user.generateJwt();
    return res.redirect(`/social?token=${token}`);
  } else {
    return res.redirect('${req.query.state}');
  }
};