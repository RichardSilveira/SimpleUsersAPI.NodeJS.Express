import {addUser} from '../controllers/userController'

const routes = (app) => {
    app.route('/users')
        .get((req, res, next) => {
            // fun with middlewares (play a little with it later)

            console.log(`request info: ${req.method}, ${req.originalUrl}`)
            next()

        }, (req, res) => res.send('GET OK'))

        .post(addUser)

    app.route('/users/:userID')
        .put((req, res) => res.send('PUT OK'))
        .delete((req, res) => res.send('DELETE OK'))
}

export default routes