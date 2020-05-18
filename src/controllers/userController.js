const mongoose = require('mongoose');
const UserSchema = require('../models/userModel');
const { usersApiConfig } = require('../config/config');

const User = mongoose.model('User', UserSchema);

const { baseUri } = usersApiConfig;

exports.addUser = async (req, res) => {
  const newUser = new User(req.body);

  const user = await newUser.save();

  res.location(`${baseUri}/users/${user._id}`);
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const user = await User.find({}).lean().exec();
  if (!user) res.status(404).send();

  res.json(user);
};

exports.getUserByID = async (req, res) => {
  const user = await User.findById(req.params.userID).lean().exec();
  if (!user) res.status(404).send();

  res.json(user);
};


exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.userID },
    req.body, { new: true, useFindAndModify: false }).exec();

  if (!user) res.status(404).send();

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.userID }).exec();

  res.status(204).send();
};
