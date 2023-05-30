// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  autoIndex: true,
});

// подключаем мидлвары, роуты и всё остальное...

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});