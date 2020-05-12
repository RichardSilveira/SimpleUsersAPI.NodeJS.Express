import {
  getUser, getUserByID, addUser, updateUser, deleteUser,
} from '../controllers/userController';
import { login, loginRequired, register } from '../controllers/authController';

const handle = (promiseFn) => (req, res, next) => promiseFn(req, res, next).catch((err) => next(err));


const routes = (app) => {

  // User routes
  app.route('/users')
    .get(handle(async (req, res, next) => getUser(req, res, next)))


    .post(handle(async (req, res, next) => addUser(req, res, next)));

  app.route('/users/:userID')
    .get(handle(async (req, res, next) => getUserByID(req, res, next)))
    .put(handle(async (req, res, next) => updateUser(req, res, next)))
    .delete(handle(async (req, res, next) => deleteUser(req, res, next)));

  // Auth routes
  app.route('/auth/login')
    .post(handle(async (req, res, next) => login(req, res, next)));

  app.route('/auth/register')
    .post(handle(async (req, res, next) => register(req, res, next)));

  // note: loginRequired middleware removed for tests, we should put it before the controller' method itself
  // I'll use a mock for it later...
};

export default routes;
