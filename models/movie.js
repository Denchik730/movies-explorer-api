const mongoose = require('mongoose');

const { reg } = require('../utils/constants');

const { INVALID_LINK_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле \'country\' должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле \'director\' должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле \'duration\' должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле \'year\' должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле \'description\' должно быть заполнено'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => reg.test(v),
      message: (props) => `${props.value} ${INVALID_LINK_MESSAGE}`,
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => reg.test(v),
      message: (props) => `${props.value} ${INVALID_LINK_MESSAGE}`,
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => reg.test(v),
      message: (props) => `${props.value} ${INVALID_LINK_MESSAGE}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле \'movieId\' должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле \'nameRU\' должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле \'nameEN\' должно быть заполнено'],
  },
}, {
  versionKey: false,
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = {
  Movie,
};
