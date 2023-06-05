const { celebrate, Joi } = require('celebrate');

const { reg } = require('./constants');

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const registerUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const createMovieValidation = celebrate({
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
});

module.exports = {
  updateUserValidation,
  registerUserValidation,
  loginUserValidation,
  deleteMovieValidation,
  createMovieValidation,
};
