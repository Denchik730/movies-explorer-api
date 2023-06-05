const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const FILM_NOT_FOUND_MESSAGE = 'Запрашиваемый фильм не найден';
const FILM_FORBIDDEN_DELETE_MESSAGE = 'Невозможно удалить чужой фильм';

const USER_NOT_FOUND_MESSAGE = 'Запрашиваемый пользователь не найден';
const USER_INVALID_DATA_MESSAGE = 'Переданы некорректные данные';
const USER_CONFLICT_EMAIL_MESSAGE = 'Пользователь с таким email уже зарегистрирован';

const NEED_AUTHORIZE_MESSAGE = 'Необходима авторизация';

const INVALID_EMAIL_OR_PASS_MESSAGE = 'Передан неверный логин или пароль';

const INVALID_LINK_MESSAGE = 'невалидная ссылка';

const INVALID_EMAIL_FORMAT_MESSAGE = 'Неправильный формат почты';

const SERVER_DEFAULT_MESSAGE = 'На сервере произошла ошибка';

const PAGE_NOT_FOUND_MESSAGE = 'Неверный адрес запроса';

const MONGO_DUPLICATE_ERR_CODE = 11000;

const CREATED_CODE = 201;

module.exports = {
  reg,
  DATABASE_URL,
  FILM_NOT_FOUND_MESSAGE,
  FILM_FORBIDDEN_DELETE_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_INVALID_DATA_MESSAGE,
  USER_CONFLICT_EMAIL_MESSAGE,
  NEED_AUTHORIZE_MESSAGE,
  INVALID_EMAIL_OR_PASS_MESSAGE,
  INVALID_LINK_MESSAGE,
  INVALID_EMAIL_FORMAT_MESSAGE,
  SERVER_DEFAULT_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  MONGO_DUPLICATE_ERR_CODE,
  CREATED_CODE,
};
