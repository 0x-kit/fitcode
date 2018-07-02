const assert = require("assert");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../app");
const constants = require("../constants/user");

User = require("../../models/user");

describe.only("API test - Authentication", () => {
  let user, user1, error;

  beforeEach(async () => {
    user = constants.existent();
    user1 = constants.existent2();

    await User.deleteMany({ _id: { $in: [user._id, user1._id] } });
    await user.save();
    await user1.save();
  });

  it("GET request to /auth/google forwards user's request to Google", async () => {
    //redirect
    const response = await request(app)
      .get("/auth/google")
      .expect(302);
  });
  it("GET request to /auth/google/callback?code Google replies with user info");

  it("POST request to /auth/signup register a new user", async () => {
    const newUser = constants.new();
    const response = await request(app)
      .post("/auth/signup")
      .send(newUser)
      .expect(200);
  });
  it("POST request to /auth/signin logs an user in", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({
        email: "idoexist@test.com",
        password: "password"
      })
      .expect(res => expect(res.body).to.have.property("token"))
      .expect(200);
  });
});
