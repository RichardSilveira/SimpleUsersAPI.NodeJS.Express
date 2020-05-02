import {getUser, getUserByID, addUser, updateUser, deleteUser} from '../controllers/userController'
import {login, loginRequired, register} from '../controllers/authController'

const routes = (app) => {

    // User routes
    app.route('/users')
        .get((req, res, next) => {
            // fun with middlewares (play a little with it later)

            console.log(`request info: ${req.method}, ${req.originalUrl}`)
            next()

        }, loginRequired, getUser)

        .post(loginRequired, addUser)

    app.route('/users/:userID')
        .get(loginRequired, getUserByID)
        .put(loginRequired, updateUser)
        .delete(loginRequired, deleteUser)

    // Auth routes
    app.route('/auth/login')
        .post(login)

    app.route('/auth/register')
        .post(register)
}

export default routes