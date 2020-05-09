import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const addUser = async (req, res) => {
  const newUser = new User(req.body);

  const user = await newUser.save();
  res.json(user);
};

export const getUser = async (req, res) => {
  const user = await User.find({}).exec();
  res.json(user);
};

export const getUserByID = async (req, res) => {
  const user = await User.findById(req.params.userID).exec();
  res.json(user);
};


export const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.userID },
    req.body, { new: true, useFindAndModify: false }).exec();

  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.remove({ _id: req.params.userID }).exec();

  res.json({ message: 'User successfuly deleted' });
};
