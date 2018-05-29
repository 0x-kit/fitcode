const passport = require("passport");
const jwt = require("../services/jwt");

exports.passportAuthGoogle = () => {
  return passport.authenticate("google", {
    scope: ["profile", "email"]
  });
};

exports.passportAuthenticate = strategy => {
  return passport.authenticate(strategy, { session: false });
};

exports.signIn = (req, res) => {
  const token = jwt.signToken(req, res);
  return res
    .status(200)
    .json({ message: "Auth sucessful", user: req.user, token: token });
};
