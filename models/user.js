/**
 * User Model - Represents a single record of the user collection.
 */

const mongoose = require('mongoose');
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
  googleID: { type: String }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
