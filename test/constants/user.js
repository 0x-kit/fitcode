User = require("../../models/user");

module.exports = {
  emptyName() {
    return new User({ email: "test@test.com", hash_password: "password" });
  },
  emptyPassword() {
    return new User({ name: "tester", email: "test@test.com" });
  },
  emptyEmail() {
    return new User({ name: "tester", hash_password: "password" });
  },
  invalidID() {
    return new User({
      _id: "5ae5a212700aa219f82e54e1",
      name: "tt",
      email: "testtest.com",
      hash_password: "pass"
    });
  },
  invalidName() {
    return new User({
      name: "tt",
      email: "test@test.com",
      hash_password: "hash_password"
    });
  },
  invalidPassword() {
    return new User({ name: "tt", email: "test@test.com", hash_password: "pass" });
  },
  invalidEmail() {
    return new User({ name: "tt", email: "testtest.com", hash_password: "password" });
  },
  existent() {
    return new User({
      name: "user",
      email: "idoexist@test.com",
      hash_password: "password"
    });
  },
  existent2() {
    return new User({
      name: "user",
      email: "idoexist2@test.com",
      hash_password: "password"
    });
  },
  new() {
    return new User({
      name: "user",
      email: "imnew@test.com",
      hash_password: "password"
    });
  },
  nonExistent() {
    return new User({
      _id: "5ae328a947c1c91862ad1c90",
      name: "userx",
      email: "idontexist@gmail.com",
      hash_password: "password"
    });
  },
  updatedUserProps() {
    return [{ propName: "name", value: "userupdated" }];
  },
  updatedInvalidUserName() {
    return [{ propName: "name", value: "tt" }];
  },
  updatedInvalidUserPassword() {
    return [{ propName: "password", value: "pass" }];
  },
  updatedInvalidUserEmail() {
    return [{ propName: "email", value: "testtest.com" }];
  }
};
