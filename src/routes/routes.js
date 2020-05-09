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
    }, handle(async (req, res, next) => getUser(req, res, next)))
    // loginRequired middleware removed for tests, we should put it before the controller' method itself
    // I'll use a mock for it later...

    .post(handle(async (req, res, next) => addUser(req, res, next)));

  app.route('/users/:userID')
    .get(handle(async (req, res, next) => getUserByID(req, res, next)))
    .put(handle(async (req, res) => updateUser(req, res)))
    .delete(handle(async (req, res) => deleteUser(req, res)));

  // Auth routes
  app.route('/auth/login')
    .post(login);

  app.route('/auth/register')
    .post(register);
};

export default routes;
