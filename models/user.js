const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { AuthError } = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле \'email\' должно быть заполнено'],
    validate: {
      validator: validator.isEmail,
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
        return Promise.reject(new AuthError('Передан неверный логин или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Передан неверный логин или пароль'));
          }

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
};
