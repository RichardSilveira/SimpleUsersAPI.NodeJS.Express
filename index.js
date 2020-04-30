import express from 'express'
import userRoutes from './src/routes/userRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = 4000

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
    console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error)
})

mongoose.connect('mongodb://root:example@localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

userRoutes(app)//todo: it sounds like not a good practice, research about it (probably I should be a centralized route module

app.get('/', (req, res) =>
    res.send(`Express running on port ${PORT}`)
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))