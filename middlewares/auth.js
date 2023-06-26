const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { AuthError } = require('../errors/AuthError');
const { NEED_AUTHORIZE_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new AuthError(NEED_AUTHORIZE_MESSAGE));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError(NEED_AUTHORIZE_MESSAGE));
  }

  req.user = payload;

  return next();
};
