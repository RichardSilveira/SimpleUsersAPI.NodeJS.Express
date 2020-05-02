import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {AuthUserSchema} from '../models/authUserModel'

const AuthUser = mongoose.model('AuthUser', AuthUserSchema)

export const register = (req, res) => {
    const user = new AuthUser(req.body)

    user.hashPassword = bcrypt.hashSync(req.body.password, 10)
    user.save((err, user) => {
        if (err)
            return res.status(400).send({message: err})

        user.hashPassword = undefined
        return res.json(user)
    })
}

export const login = (req, res) => {

    const {password, email} = req.body

    AuthUser.findOne({email}, (err, user) => {
        if (err) throw err

        if (!user)
            return res.status(401).json({message: 'User not found'})

        if (!user.comparePassword(password, user.hashPassword))
            return res.status(401).json({message: 'User not found'})//Isn't a good idea return the real reason here...

        const token = jwt.sign({_id: user._id, email: user.email, username: user.userName},
            process.env.AUTH_SECRET,
            {expiresIn: 300}) // 5 mins
        return res.status(200).json({token})
    })


}

export const loginRequired = (req, res, next) => req.user ? next() : res.status(401).json({message: 'Unauthorized!'})