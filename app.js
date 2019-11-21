
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const cards = require('./routes/cards');
const users = require('./routes/users');

app.listen(PORT, () => {
});
app.use((req, res, next) => {
  req.user = {
    _id: '5dd4fab03219415aa41127ca',
  };

  next();
});
app.use('/cards', cards);
app.use('/users', users);
app.get('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
