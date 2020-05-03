import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

export const AuthUserSchema = new Schema({
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
