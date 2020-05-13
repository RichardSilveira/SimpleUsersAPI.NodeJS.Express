import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import {
  stage, usersApiConfig, mongodbConfig, jwtConfig,
} from './config';
import routes from './routes/routes';

const app = express();
const PORT = usersApiConfig.port;

/* Client must add header "Accept-Encoding: gzip,deflate"
  note: may your Reverse Proxy should do this work for you
 */
app.use(compression());

// To add a basic, but good level of protection, adding Headers as "X-XSS-Protection" (among others) by example
app.use(helmet());
app.use(cors()); // custom settings eg. allowed origins will be setted up when a front end will exists.

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('Connection Established');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed');
});

mongoose.connection.on('error', (error) => {
  console.log(`ERROR: ${error}`);
});

mongoose.connect(mongodbConfig.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT Header setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], jwtConfig.secret, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      console.log(`Authenticated user ${req.user}`);
    });
  } else {
    req.user = undefined;
    console.log('Anonymous user');
  }

  next();
});

const v1 = express.Router();
routes(v1);
app.use('/v1', v1);

app.use((err, req, res, next) => {
  console.log(`An error was throw ${err}`);
  res.status(500).send('An unexpected error has occurred'); // We can improve it, but for now, it's ok...
});

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => res.send(`Express running on port ${PORT}`));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${stage}`);
});
