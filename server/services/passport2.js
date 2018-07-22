const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Setup options for JWT Strategy
const localOptions = { usernameField: 'email', passReqToCallback: true };
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secretToken
};
// Setup options for Google Strategy
const googleOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/api/auth/google/callback'
};

// Create local strategy
const localLogin = new LocalStrategy(
  localOptions,
  async (req, email, password, done) => {
    // Verify this username and password
    try {
      const existingUser = await User.findOne({
        email: email
      });

      if (!existingUser || !existingUser.comparePassword(password)) {
        req.authError = 'Invalid email or password.';
        return done(null, false);
      }

      return done(null, existingUser);
    } catch (err) {
      return done(err);
    }
  }
);

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  const existingUser = await User.findById(payload.sub);
  if (!existingUser) {
    return done(null, false, {
      message: 'Not valid entry found for provided ID'
    });
  }
  return done(null, existingUser);
});

// Create Google strategy
const googleLogin = new GoogleStrategy(
  googleOptions,
  (accessToken, refreshToken, profile, done) => findUserOrCreate(profile, done)
);

// Helper method for GS
const findUserOrCreate = async (profile, done) => {
  try {
    const user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      const newUser = new User();

      newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.email = profile.emails[0].value;
      newUser.save();
      return done(null, newUser);
    } else {
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
};

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
