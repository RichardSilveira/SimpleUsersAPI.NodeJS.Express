const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const AuthUserSchema = require('../models/authUserModel');
const { jwtConfig } = require('../config/config');

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

exports.register = async (req, res) => {
  const user = new AuthUser(req.body);

  user.hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await user.save();
  newUser.hashPassword = undefined;

  res.status(200).json(newUser);
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  const user = await AuthUser.findOne({ email }).exec();

  if (!user) res.status(404).send();

  if (!user.comparePassword(password, user.hashPassword)) res.status(401).send();

  const token = jwt.sign({ _id: user._id, email: user.email, username: user.userName },
    jwtConfig.secret, { expiresIn: jwtConfig.exp }); // 5 mins

  res.status(200).json({ token });
};

exports.loginRequired = (req, res, next) => {
  if (req.user) { next() } else res.status(401).send();
};
