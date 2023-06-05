const { Movie } = require('../models/movie');
const { ValidationError } = require('../errors/ValidationError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {
  FILM_NOT_FOUND_MESSAGE,
  FILM_FORBIDDEN_DELETE_MESSAGE,
  CREATED_CODE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  }).then((movie) => res.status(CREATED_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new ValidationError(message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const removeMovie = () => {
    Movie.findByIdAndRemove(req.params.movieId)
      .then((movie) => res.send(movie))
      .catch(next);
  };

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(FILM_NOT_FOUND_MESSAGE));
      }

      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(FILM_FORBIDDEN_DELETE_MESSAGE));
      }

      return removeMovie();
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
