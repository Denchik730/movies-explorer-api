const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation-celebrate');

routerMovies.post(
  '/',
  createMovieValidation,
  createMovie,
);

routerMovies.get('/', getMovies);

routerMovies.delete(
  '/:movieId',
  deleteMovieValidation,
  deleteMovie,
);

module.exports = routerMovies;
