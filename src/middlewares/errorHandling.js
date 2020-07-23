const { InternalServerError } = require('../lib/customerrors/applicationErrors');

const makeErrorHandling = {
  BadRequestError: (err, req, res, next) => {
    res.status(400).send({ message: err.message, validationErrors: err.validationErrors });
  },
  NotFoundError: (err, req, res, next) => {
    res.status(404).send();
  },
  InternalServerError: (err, req, res, next) => {
    console.log(`An error was throw ${err} and need to be logged internally`);
    res.status(500).send('An Internal Server Error was throw');
  },
};

const handleError = (err, req, res, next) => {
  const errorFn = makeErrorHandling[err.name]
    || makeErrorHandling[new InternalServerError(err.message).name];

  errorFn(err, req, res, next);
};

module.exports = handleError;
