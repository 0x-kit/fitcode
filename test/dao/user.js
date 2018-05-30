const assert = require("assert");
const User = require("../../models/user");
const constants = require("../constants/user");

describe("DAO test - User", () => {
  beforeEach("adds user for testing", done => {
    existent = constants.existent();
    nonExistent = constants.nonExistent();

    existent.save().then(() => done());
  });

  it("saves an user", done => {
    user = constants.existent();

    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });

  it("finds an user with a existent email", done => {
    User.findOne({ email: existent.email }).then(user => {
      assert(user.name === "user");
      done();
    });
  });

  it("doesn't find an user if non existent email", done => {
    User.findOne({ email: nonExistent.email }).then(user => {
      assert(user === null);
      done();
    });
  });

  it("finds an user with an existent id", done => {
    User.findById(existent._id).then(user => {
      assert(user.name === "user");
      done();
    });
  });

  it("doesn't find an user if non existent id", done => {
    User.findOne({ email: nonExistent._id }).then(user => {
      assert(user === null);
      done();
    });
  });

  it("updates an user with an existent id", done => {
    User.findByIdAndUpdate(existent._id, { name: "existentUserchanged" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "existentUserchanged");
        done();
      });
  });

  it("doesn't update an user if non existent id", done => {
    User.findByIdAndUpdate(nonExistent._id, {
      name: "nonExistentUserchanged"
    })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name !== "nonExistentUserchanged");
        done();
      });
  });
  
  it("deletes an user with an existent id", done => {
    User.remove({ _id: existent._id })
      .then(() => User.findById(existent._id))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("doesn't delete if non existent id", done => {
    User.remove({ _id: nonExistent._id })
      .then(() => User.findById(nonExistent._id))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
