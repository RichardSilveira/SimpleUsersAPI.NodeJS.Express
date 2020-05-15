const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const AuthUserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

AuthUserSchema.methods.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports = AuthUserSchema;
