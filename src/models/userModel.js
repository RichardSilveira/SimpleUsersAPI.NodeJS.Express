import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a firts name'
    },
    lastName: {
        type: String,
        required: 'Enter a firts name'
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now()
    }
})