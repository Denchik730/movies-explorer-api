const routerUsers = require('express').Router();

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../utils/validation-celebrate');

routerUsers.get('/me', getCurrentUser);

routerUsers.patch(
  '/me',
  updateUserValidation,
  updateProfile,
);

module.exports = routerUsers;
