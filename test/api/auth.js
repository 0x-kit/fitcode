const assert = require("assert");
const request = require("supertest");
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

  it("GET request to /auth/google forwards user's request to Google");
  it("GET request to /auth/google/callback?code Google replies with user info");
  it("POST request to /auth/signup register a new user");
  it("POST request to /auth/signin logs an user in");
});
