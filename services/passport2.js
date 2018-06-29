const passport = require("passport");
const User = require("../models/user");
const keys = require("../config/keys");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Setup options for JWT Strategy
const localOptions = { usernameField: "email" };

// Create local strategy
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    // Verify this username and password
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
);

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secretToken
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  const existingUser = await User.findById(payload.sub);
  if (!existingUser) {
    return done(null, false, {
      message: "Not valid entry found for provided ID"
    });
  }
  return done(null, existingUser);
});

// Setup options for Google Strategy
const googleOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"
};

// Create Google strategy
const googleLogin = new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        // We already have a record with the given profile ID
        return done(null, existingUser);
      }
      // We don't have a record with this ID, make a new record
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
);

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
