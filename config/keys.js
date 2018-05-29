// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys (heroku)
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
