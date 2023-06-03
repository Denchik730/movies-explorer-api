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
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      description: Joi.string().required(),
      year: Joi.string().required(),
      image: Joi
        .string()
        .required()
        .pattern(reg),
      trailerLink: Joi
        .string()
        .required()
        .pattern(reg),
      thumbnail: Joi
        .string()
        .required()
        .pattern(reg),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
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
