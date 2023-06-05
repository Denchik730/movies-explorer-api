const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { AuthError } = require('../errors/AuthError');
const { INVALID_EMAIL_OR_PASS_MESSAGE, INVALID_EMAIL_FORMAT } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле \'email\' должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: INVALID_EMAIL_FORMAT,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля \'name\' - 2'],
    maxlength: [30, 'Максимальная длина поля \'name\' - 30'],
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(INVALID_EMAIL_OR_PASS_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(INVALID_EMAIL_OR_PASS_MESSAGE));
          }

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
};
