const mongoose = require('mongoose');
const validator = require('validator');

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

const User = mongoose.model('user', userSchema);

module.exports = { User };