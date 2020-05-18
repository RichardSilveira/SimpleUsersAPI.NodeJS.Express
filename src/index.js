const express = require('express');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const compression = require('compression');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { HealthCheckError } = require('@godaddy/terminus');
const {
  stage, usersApiConfig, mongodbConfig, jwtConfig,
} = require('./config/config');
const routes = require('./routes/routes');
const mongooseConnectionHandler = require('./lib/mongooseConnectionHandler');
const handleSystemHealth = require('./lib/systemHealthHandler');

const app = express();
const PORT = usersApiConfig.port;


/* Client must add header "Accept-Encoding: gzip,deflate"
  note: may your Reverse Proxy should do this work for you */
app.use(compression());


app.use(helmet()); // To add a basic, but good level of protection, adding Headers as "X-XSS-Protection" (among others)
app.use(cors()); // custom settings eg. allowed origins will be setted up when a front end will exists.

mongooseConnectionHandler.connect(mongodbConfig.connectionString).catch((err) => console.log(err));

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
  res.status(500).send('An unexpected error has occurred'); // We can improve it by handling custom error objects
});

app.use(express.static('public'));// serving static files

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${stage}`);
});

// Health Check and Graceful shutdown
const makeResourcesCleanup = () => new Promise((resolve) => {
  // start cleanup of resource, like databases or file descriptors

  console.log('server is starting cleanup inside');

  mongooseConnectionHandler.close();
  resolve();
});

const makeHeathChecks = () => new Promise(((resolve, reject) => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const mongoDbConnState = mongoose.connection.readyState;

  if ([1, 2].find((it) => it === mongoDbConnState)) resolve({ mongoDbConnState });
  else reject(new HealthCheckError('Mongoose connection is closed'));
}));

handleSystemHealth(app, makeHeathChecks, makeResourcesCleanup);
