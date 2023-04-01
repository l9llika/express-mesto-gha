const express = require('express');

const INCORRECT_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports = {
  INCORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
};

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64287d0dd2ff7f73841ee2ff',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Ошибка 404: несуществующая станица' });
});

app.listen(PORT);
