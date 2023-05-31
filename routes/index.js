const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { reg } = require('../utils/constants');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
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

// router.get('/signout', auth, (req, res) => {
//   res.clearCookie('token').send({ message: 'Выход' });
// });

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = {
  router,
};
