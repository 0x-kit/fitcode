/**
 * Figure out what set of credentials to return.
 */
if (process.env.NODE_ENV === "production") {
  // (heroku)
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
