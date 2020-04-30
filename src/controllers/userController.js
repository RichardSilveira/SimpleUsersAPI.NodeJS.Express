import mongoose from 'mongoose'
import {UserSchema} from '../models/userModel'

const User = mongoose.model('User', UserSchema)

export const addUser = (req, res) => {
    let newUser = new User(req.body)

    newUser.save((err, user) => {
        if (err)
            res.send(err)

        res.json(user)
    })
}

