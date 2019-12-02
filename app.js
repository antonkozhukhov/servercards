
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');

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
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');

app.listen(PORT, () => {
});

app.use('/cards', auth, cards);
app.use('/users', auth, users);
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
