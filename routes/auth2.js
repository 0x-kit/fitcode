const router = require("express").Router();
const Authentication = require("../controllers/auth2");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
const requireSigninGoogle = passport.authenticate("google", { session: false });
const requireAuthGoogle = passport.authenticate("google", {
  scope: ["profile", "email"]
});

router
  .post("/signup", Authentication.signup)
  .post("/signin", requireSignin, Authentication.signin)

  .get("/google", requireAuthGoogle)
  .get("/google/callback", requireSigninGoogle, Authentication.signin)

  .get("/", requireAuth, function(req, res) {
    res.send({ message: "Protected route" });
  });

module.exports = router;
