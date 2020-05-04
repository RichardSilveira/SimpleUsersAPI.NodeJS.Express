import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { AuthUserSchema } from '../models/authUserModel';

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

export const register = (req, res) => {
  const newUser = new AuthUser(req.body);

  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) return res.status(400).send({ message: err });

    return res.json({ ...user, hashPassword: undefined });
  });
};

export const login = (req, res) => {
  const { password, email } = req.body;

  AuthUser.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (!user.comparePassword(password, user.hashPassword)) {
      return res.status(401).json({ message: 'User not found' });// Isn't a good idea return the real reason here...
    }

    const token = jwt.sign({ _id: user._id, email: user.email, username: user.userName },
      process.env.AUTH_SECRET,
      { expiresIn: 300 }); // 5 mins
    return res.status(200).json({ token });
  });
};

export const loginRequired = (req, res, next) => {
  if (req.user) { next() } else res.status(401).json({ message: 'Unauthorized!' });
};
