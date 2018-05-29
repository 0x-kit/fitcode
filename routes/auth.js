const router = require("express").Router();
const jwt = require("../services/jwt");
const passport = require("passport");

const authController = require("../controllers/auth");

router
  .get("/auth/google", authController.passportAuthGoogle())
  .get(
    "/auth/google/callback",
    authController.passportAuthenticate("google"),
    authController.signIn
  )
  .post(
    "/auth/local",
    authController.passportAuthenticate("local"),
    authController.signIn
  );

module.exports = router;
