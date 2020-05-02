import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {AuthUserSchema} from '../models/authUserModel'

const UserAuth = mongoose.model('AuthUser', AuthUserSchema)

export const register = (req, res) => {

}

export const login = (req, res) => {

}

export const loginRequired = (req, res, next) => req.user ? next() : res.status(401).json({message: 'Unauthorized!'})