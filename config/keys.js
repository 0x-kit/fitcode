/**
 * Figure out what set of credentials to return.
 */
if (process.env.NODE_ENV === "production") {
  // (heroku)
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./test");
} else {
  module.exports = require("./dev");
}
