require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { limiter, optionDatabase } = require('./utils/configuration');
const { DATABASE_URL } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { router } = require('./routes/index');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;

const app = express();

app.use(cors());

mongoose.connect(
  NODE_ENV === 'production' ? MONGO_URL : DATABASE_URL,
  optionDatabase,
);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
