const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
/**
 * Check if Token exists on request Header and attach token to request as attribute.
 * Verify Token validity and attach token data as request attribute
 */
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, keys.secretToken);
    req.authData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
/**
 * Issue Token
 */
exports.signToken = (req, res) => {
  return jwt.sign({ userId: req.user._id }, keys.secretToken, {
    expiresIn: "5 min"
  });
};
