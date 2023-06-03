const router = require('express').Router();

const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { registerUserValidation, loginUserValidation } = require('../utils/validation-celebrate');

router.post(
  '/signup',
  registerUserValidation,
  createUser,
);

router.post(
  '/signin',
  loginUserValidation,
  login,
);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = {
  router,
};
