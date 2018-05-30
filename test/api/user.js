const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const constants = require("../constants/user");

User = require("../../models/user");

describe.only("API test - User", () => {
  let user, user1, error;

  beforeEach(done => {
    user = constants.existent();
    user1 = constants.existent2();

    Promise.all([user.save(), user1.save()]).then(() => done());
  });

  it("GET request to /user retrieves all users", done => {
    request(app) //express app
      .get("/user")
      .end((err, response) => {
        console.log(response.body.response.users.length);
        assert(response.body.response.users.length === 2);
        assert(response.statusCode == "200");
        done();
      });
  });

  it("GET request to /user/id finds an user", done => {
    request(app) //express app
      .get(`/user/${user._id}`)
      .end((err, response) => {
        const res = response.body;
        assert(res.user !== null);
        assert(res.user._id == user._id);
        assert(response.statusCode == "200");
        done();
      });
  });

  it.skip("GET request to /user/invalidId doesn't find an user", done => {
    const invalidUser = constants.invalidID();
    request(app)
      .get(`/user/${invalidUser._id}`)
      .end((err, response) => {
        const res = response.body;
        assert(res.message === "Not valid entry found for provided ID");
        assert(response.statusCode == "404");
        done();
      });
  });

  it.skip("POST to /user creates an user", done => {
    User.count().then(count => {
      request(app)
        .post("/user")
        .send(constants.new())
        .end((err, response) => {
          User.count().then(newCount => {
            assert(count + 1 === newCount);
            assert(response.statusCode == "201");
            done();
          });
        });
    });
  });

  it.skip("POST to /user with missing name doesn't create an user", done => {
    User.count().then(count => {
      request(app)
        .post("/user")
        .send(constants.emptyName())
        .end((err, response) => {
          error = validationError(response.body.error);

          User.count().then(newCount => {
            assert(count === newCount);
            assert(error === "user validation failed");
            assert(response.statusCode == "422");
            done();
          });
        });
    });
  });

  it.skip("POST to /user with missing email doesn't create an user", done => {
    User.count().then(count => {
      request(app)
        .post("/user")
        .send(constants.emptyEmail())
        .end((err, response) => {
          error = validationError(response.body.error);

          User.count().then(newCount => {
            assert(count === newCount);
            assert(error === "user validation failed");
            assert(response.statusCode == "422");
            done();
          });
        });
    });
  });

  it.skip("POST to /user with missing password doesn't create an user", done => {
    User.count().then(count => {
      request(app)
        .post("/user")
        .send(constants.emptyPassword())
        .end((err, response) => {
          error = validationError(response.body.error);

          User.count().then(newCount => {
            assert(count === newCount);
            assert(error === "user validation failed");
            assert(response.statusCode == "422");
            done();
          });
        });
    });
  });

  it.skip("PATCH to /user/id updates an existing user", done => {
    const updatedProps = constants.updatedUserProps();
    request(app)
      .patch(`/user/${user._id}`)
      .send(updatedProps)
      .end((err, response) => {
        User.findOne({ _id: user._id }).then(user => {
          assert(user !== null);
          assert(user.name === updatedProps[0].value);
          assert(response.statusCode == "200");
          done();
        });
      });
  });

  it.skip("PATCH to /user/invalidId doesn't update an existing user", done => {
    const updatedProps = constants.updatedUserProps();
    const invalidUser = constants.invalidID();

    request(app)
      .patch(`/user/${invalidUser._id}`)
      .send(updatedProps)
      .end((err, response) => {
        const res = response.body;
        assert(res.message === "Not valid entry found for provided ID");
        assert(response.statusCode == "404");
        done();
      });
  });

  it.skip("PATCH to /user/id with invalid name doesn't update an existing user", done => {
    const updatedProps = constants.updatedInvalidUserName();

    request(app)
      .patch(`/user/${user._id}`)
      .send(updatedProps)
      .end((err, response) => {
        const error = response.body.error.name;
        assert(error === "ValidationError");
        assert(response.statusCode == "422");
        done();
      });
  });

  it.skip("PATCH to /user/id with invalid email doesn't update an existing user", done => {
    const updatedProps = constants.updatedInvalidUserEmail();

    request(app)
      .patch(`/user/${user._id}`)
      .send(updatedProps)
      .end((err, response) => {
        const error = response.body.error.name;
        assert(error === "ValidationError");
        assert(response.statusCode == "422");
        done();
      });
  });

  it.skip("PATCH to /user/id with invalid password doesn't update an existing user", done => {
    const updatedProps = constants.updatedInvalidUserPassword();

    request(app)
      .patch(`/user/${user._id}`)
      .send(updatedProps)
      .end((err, response) => {
        const error = response.body.error.name;
        assert(error === "ValidationError");
        assert(response.statusCode == "422");
        done();
      });
  });

  it.skip("DELETE to /user/id deletes an existing user", done => {
    request(app)
      .delete(`/user/${user._id}`)
      .end((err, response) => {
        User.findOne({ _id: user._id }).then(user => {
          assert(user === null);
          assert(response.statusCode == "200");
          done();
        });
      });
  });

  it.skip("DELETE to /user/invalidId doesn't delete an existing user", done => {
    const invalidUser = constants.invalidID();
    request(app)
      .delete(`/user/${invalidUser._id}`)
      .end((err, response) => {
        const res = response.body;
        assert(res.message === "Not valid entry found for provided ID");
        assert(response.statusCode == "404");
        done();
      });
  });
});

function validationError(error) {
  return error.split(":")[0];
}
