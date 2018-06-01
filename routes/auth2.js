const router = require("express").Router();
const Authentication = require("../controllers/auth2");
const passport = require("passport");

router.post("/signup", Authentication.signup);

module.exports = router;
