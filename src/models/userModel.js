/* eslint-disable no-underscore-dangle */
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

// todo: To fix this sort of issue, first off all, I'll need of some sort of "service" layer on top of it...
// I may create another feature, e.g. Socket.IO to show off the problems of the actual architecture...
UserSchema.methods.transform = () => {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;
  return obj;
};
