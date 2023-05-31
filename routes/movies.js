const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { reg } = require('../utils/constants');

routerMovies.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.string().required().min(2).max(30),
      year: Joi.string().required().min(2).max(30),
      image: Joi
        .string()
        .required()
        .pattern(reg),
      trailer: Joi
        .string()
        .required()
        .pattern(reg),
      thumbnail: Joi
        .string()
        .required()
        .pattern(reg),
      nameRU: Joi.string().required().min(2).max(30),
      nameEN: Joi.string().required().min(2).max(30),
      movieId: Joi.string().required().min(2).max(30),
    }),
  }),
  createMovie,
);

routerMovies.get('/', getMovies);

routerMovies.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = routerMovies;
