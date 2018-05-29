const jwt = require('jsonwebtoken');

// Check if Token exists on request Header and attach token to request as attribute
// Verify Token validity and attach token data as request attribute
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    req.authData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};

// Issue Token
exports.signToken = (req, res) => {
  jwt.sign(
    { userId: req.user._id },
    'secretkey',
    { expiresIn: '5 min' },
    (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({ user: req.user, token: token });
      }
    }
  );
};
