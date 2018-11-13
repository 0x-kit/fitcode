const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const _ = require('lodash');

const GoalSchema = require('./goals');
const DiaryModel = require('./diary');

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
      validator: password => password.length >= 5,
      message: 'Password must be longer than 5 characters.'
    },
    required: [true, 'Password is required.']
  },
  googleID: { type: String },
  goals: {
    type: GoalSchema,
    default: {
      macros: {
        proteins: 0,
        carbs: 0,
        fats: 0,
        calories: 0
      },
      goalWeight: null,
      currentWeight: []
    }
  }
});

/** Methods */
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  const user = this;
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secretToken);
};

/** Hooks */
UserSchema.pre('save', async function (next) {
  const user = this;

  const diaries = _.times(5, index => DiaryModel.createDiary(index, user._id));

  await DiaryModel.insertMany(diaries);

  next();
});

UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
