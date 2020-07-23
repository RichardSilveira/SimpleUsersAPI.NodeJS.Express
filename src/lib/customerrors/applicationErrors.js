// eslint-disable-next-line max-classes-per-file
class ApplicationErrors extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
  }
}

class InvalidArgumentError extends ApplicationErrors {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends ApplicationErrors {
  constructor(message, errors) {
    if (!message && !errors) {
      throw new InvalidArgumentError(`You should inform either message (for an domain/generic error description) or
      errors collection (for a error-by-field pattern) or even both if needed`);
    }

    super(message);

    this.validationErrors = errors || [];
  }
}

class NotFoundError extends ApplicationErrors {
  constructor(message) {
    super(message);
  }
}


class InternalServerError extends ApplicationErrors {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
};
