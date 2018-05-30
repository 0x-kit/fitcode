const expect = require("chai").expect;
const assert = require("assert");
const constants = require("../constants/user");
const User = require("../../models/user");

describe("Entity test - User", () => {
  let user;

  it("should be invalid if name is empty", done => {
    user = constants.emptyName();

    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it("should be invalid if password is empty", done => {
    user = constants.emptyPassword();

    user.validate(err => {
      expect(err.errors.hash_password).to.exist;
      done();
    });
  });

  it("should be invalid if email is empty", done => {
    user = constants.emptyEmail();

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("should be invalid if name is shorter than 2 characters", done => {
    user = constants.invalidName();

    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it("should be invalid if password is shorter than 5 characters", done => {
    user = constants.invalidPassword();

    user.validate(err => {
      expect(err.errors.hash_password).to.exist;
      done();
    });
  });

  it("should be invalid if email does not match the format", done => {
    user = constants.invalidEmail();

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("should be valid if (name,password,email) match the correct format", done => {
    user = constants.existent();

    user.validate(err => {
      assert(err === null);
      done();
    });
  });
});
