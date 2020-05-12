import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { AuthUserSchema } from '../models/authUserModel';

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

export const register = async (req, res) => {
  const user = new AuthUser(req.body);

  user.hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await user.save();
  newUser.hashPassword = undefined;

  res.status(200).json(newUser);
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await AuthUser.findOne({ email }).exec();

  if (!user) res.status(404).send();

  if (!user.comparePassword(password, user.hashPassword)) res.status(401).send();

  const token = jwt.sign({ _id: user._id, email: user.email, username: user.userName },
    process.env.AUTH_SECRET, { expiresIn: 300 }); // 5 mins

  res.status(200).json({ token });
};

export const loginRequired = (req, res, next) => {
  if (req.user) { next() } else res.status(401).send();
};
