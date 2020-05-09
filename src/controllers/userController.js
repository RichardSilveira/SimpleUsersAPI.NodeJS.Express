import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const addUser = async (req, res) => {
  const newUser = new User(req.body);

  const user = await newUser.save();

  res.location(`/v1/users/${user._id}`);
  res.status(201).json(user);
};

export const getUser = async (req, res) => {
  const user = await User.find({}).exec();
  res.json(user);
};

export const getUserByID = async (req, res) => {
  // todo: return Not found properly
  const user = await User.findById(req.params.userID).exec();
  res.json(user);
};


export const updateUser = async (req, res) => {
  //todo: Create a new one in case of user not found and returns 201 instead
  const user = await User.findOneAndUpdate({ _id: req.params.userID },
    req.body, { new: true, useFindAndModify: false }).exec();

  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.userID }).exec();

  res.status(204).json();
};
