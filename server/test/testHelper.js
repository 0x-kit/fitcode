/**
 * Initial setup for the tests
 */
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const keys = require("../config/keys");

before("Tells mongoose to conect to mongo", done => {
  mongoose.connect(keys.mongoURI);
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach("Drops collections before each test", done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});
