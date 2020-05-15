/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name',
  },
  lastName: {
    type: String,
    required: 'Enter a first name',
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = UserSchema;
