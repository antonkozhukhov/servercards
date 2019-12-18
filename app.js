require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NODE_ENV, JWT_SECRET } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('./config');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const { PORT = 3000 } = process.env;
const cards = require('./routes/cards');
const users = require('./routes/users');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');

app.listen(PORT, () => {
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/cards', auth, cards);
app.use('/users', auth, users);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
