const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      console.log(profile);
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      } else {
        // we don't have a record with this ID, make a new record
        const newUser = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          googleID: profile.id
        }).save();

        return done(null, newUser);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({
        email: email,
        password: password
      });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        return done(null, false);
      }
    }
  )
);
