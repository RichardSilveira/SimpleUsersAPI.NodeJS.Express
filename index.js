import express from 'express'
import routes from './src/routes/routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv-safe'

dotenv.config()

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

mongoose.connect('mongodb://root:example@localhost/users?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// JWT Header setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.AUTH_SECRET, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            console.log(`Authenticated user ${req.user}`)
        });
    } else {
        req.user = undefined;
        console.log('Anonymous user')
    }

    next();

});

routes(app)

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.send(`Express running on port ${PORT}`)
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))