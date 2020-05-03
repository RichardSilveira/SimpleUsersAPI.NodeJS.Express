import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema({
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
