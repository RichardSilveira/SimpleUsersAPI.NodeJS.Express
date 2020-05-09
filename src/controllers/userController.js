import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const addUser = async (req, res) => {
  const newUser = new User(req.body);

  await newUser.save((err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

export const getUser = async (req, res) => {
  await User.find({}, (err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

export const getUserByID = async (req, res) => {
  const user = await User.findById(req.params.userID);
  res.json(user);
};


export const updateUser = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) res.send(err);

      res.json(user);
    });
};

export const deleteUser = async (req, res) => {
  await User.remove({ _id: req.params.userID }, (err) => {
    if (err) res.send(err);

    res.json({ message: 'User successfuly deleted' });
  });
};
