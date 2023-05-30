const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

routerUsers.get('/me', getCurrentUser);

routerUsers.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

module.exports = routerUsers;
