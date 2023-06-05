const { SERVER_DEFAULT_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? SERVER_DEFAULT_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
