const jwt = require("jwt-simple");
const User = require("../models/user");
const keys = require("../config/keys");

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const user = req.user;
  res.send({ token: user.generateJwt() });
};

exports.signup = async (req, res, next) => {
  try {
    const { email, hash_password, name } = req.body;

    // See if a user with the given email exist
    const user = await User.findOne({ email: email });

    if (user) return res.status(422).json({ message: "Email is in use." });

    const newUser = new User({
      name: name,
      email: email,
      hash_password: hash_password
    });

    await newUser.save();

    res.status(200).json({ token: newUser.generateJwt() });
  } catch (err) {
    err.name === "ValidationError"
      ? res.status(422).json({ error: err.message })
      : res.status(500).json({ error: err });
  }
};
