const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');
const { ValidationError } = require('../errors/ValidationError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const {
  USER_NOT_FOUND_MESSAGE,
  USER_INVALID_DATA_MESSAGE,
  USER_CONFLICT_EMAIL_MESSAGE,
  CREATED_CODE,
  MONGO_DUPLICATE_ERR_CODE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      // res.cookie('token', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      // });

      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res
        .status(CREATED_CODE)
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_EMAIL_MESSAGE));
      } else if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new ValidationError(message));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(USER_INVALID_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  }).then((user) => {
    if (!user) {
      return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
    }

    return res.send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((error) => error.message).join('; ');
      next(new ValidationError(message));
    } else if (err.name === 'CastError') {
      next(new ValidationError(USER_INVALID_DATA_MESSAGE));
    } else if (err.code === MONGO_DUPLICATE_ERR_CODE) {
      next(new ConflictError(USER_CONFLICT_EMAIL_MESSAGE));
    } else {
      next(err);
    }
  });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
