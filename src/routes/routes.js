import {
  getUser, getUserByID, addUser, updateUser, deleteUser,
} from '../controllers/userController';
import { login, loginRequired, register } from '../controllers/authController';

const handle = (promiseFn) => (req, res, next) => promiseFn(req, res, next).catch((err) => next(err));


const routes = (app) => {
  // User routes
  app.route('/users')
    .get((req, res, next) => {
      // fun with middlewares (play a little with it later)

      console.log(`request info: ${req.method}, ${req.originalUrl}`);
      next();
    }, getUser)
    // loginRequired middleware removed for tests, we should put it before the controller' method itself
    // I'll use a mock for it later...

    .post(addUser);

  app.route('/users/:userID')
    .get(handle(async (req, res, next) => getUserByID(req, res, next)))
    .put(async (req, res) => updateUser(req, res))
    .delete(async (req, res) => deleteUser(req, res));

  // Auth routes
  app.route('/auth/login')
    .post(login);

  app.route('/auth/register')
    .post(register);
};

export default routes;
