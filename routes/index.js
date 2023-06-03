const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
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
