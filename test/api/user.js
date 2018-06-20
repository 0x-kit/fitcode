const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const constants = require("../constants/user");

User = require("../../models/user");

describe("API test - User", () => {
  let user, user1, error;

  beforeEach(async () => {
    user = constants.existent();
    user1 = constants.existent2();

    await User.deleteMany({ _id: { $in: [user._id, user1._id] } });
    await user.save();
    await user1.save();
  });

  it("GET request to /user retrieves all users", async () => {
    const response = await request(app)
      .get("/user")
      .expect(200);
  });

  it("GET request to /user/id finds an user", async () => {
    const response = await request(app)
      .get(`/user/${user._id}`)
      .expect(200);
  });

  it("GET request to /user/invalidId doesn't find an user", async () => {
    const invalidUser = constants.invalidID();
    const response = await request(app)
      .get(`/user/${invalidUser._id}`)
      .expect(404);
  });

  it("POST to /user creates an user", async () => {
    const newUser = constants.new();
    const response = await request(app)
      .post("/user")
      .send(newUser)
      .expect(201);
  });

  it("POST to /user with missing name doesn't create an user", async () => {
    const response = await request(app)
      .post("/user")
      .send(constants.emptyName())
      .expect(422);
  });

  it("POST to /user with missing email doesn't create an user", async () => {
    const response = await request(app)
      .post("/user")
      .send(constants.emptyEmail())
      .expect(422);
  });

  it("POST to /user with missing password doesn't create an user", async () => {
    const response = await request(app)
      .post("/user")
      .send(constants.emptyPassword())
      .expect(422);
  });

  it("PUT to /user/id updates an existing user", async () => {
    const updatedProps = constants.updatedProps();
    const response = await request(app)
      .put(`/user/${user._id}`)
      .send(updatedProps)
      .expect(200);
  });

  it("PUT to /user/invalidId doesn't update an existing user", async () => {
    const updatedProps = constants.updatedProps();
    const invalidUser = constants.invalidID();

    const response = await request(app)
      .put(`/user/${invalidUser._id}`)
      .send(updatedProps)
      .expect(404);
  });

  it("PUT to /user/id with invalid name doesn't update an existing user", async () => {
    const updatedProps = constants.updatedInvalidName();

    const response = await request(app)
      .put(`/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("PUT to /user/id with invalid email doesn't update an existing user", async () => {
    const updatedProps = constants.updatedInvalidEmail();

    const response = await request(app)
      .put(`/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("PUT to /user/id with invalid password doesn't update an existing user", async () => {
    const updatedProps = constants.updatedInvalidPassword();

    const response = await request(app)
      .put(`/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("DELETE to /user/id deletes an existing user", async () => {
    const response = await request(app)
      .delete(`/user/${user._id}`)
      .expect(200);
  });

  it("DELETE to /user/invalidId doesn't delete an existing user", async () => {
    const invalidUser = constants.invalidID();
    const response = await request(app)
      .delete(`/user/${invalidUser._id}`)
      .expect(404);
  });
});