const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const GoalSchema = require('./goals');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    validate: {
      validator: password => password.length > 5,
      message: 'Password must be longer than 5 characters.'
    },
    required: [true, 'Password is required.']
  },
  googleID: { type: String },
  goals: GoalSchema
});

/** Methods */
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function() {
  const user = this;
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secretToken);
};

/** Hooks */
UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
