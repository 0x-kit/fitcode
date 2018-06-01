const keys = require("../config/keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose");
const User = mongoose.model("user");
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (existingUser) {
          // we already have a record with the given profile ID
          return done(null, existingUser);
        }
        // we don't have a record with this ID, make a new record
        const newUser = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          hash_password: profile.id,
          googleID: profile.id
        }).save();

        return done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },

    async (email, password, done) => {
      try {
        const existingUser = await User.findOne({
          email: email
        });

        if (!existingUser) {
          return done(null, false, { message: "Invalid email" });
        }

        if (!existingUser.comparePassword(password)) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, existingUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
