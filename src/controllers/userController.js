import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const addUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

export const getUser = (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

export const getUserByID = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) res.json(err);

    res.json(user);
  });
};

export const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID }, req.body, { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) res.send(err);

      res.json(user);
    });
};

export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err) => {
    if (err) res.send(err);

    res.json({ message: 'User successfuly deleted' });
  });
};
