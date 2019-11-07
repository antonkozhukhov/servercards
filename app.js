/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const express = require('express');
const app = express();
const path = require('path');
const { PORT = 3000 } = process.env;
const cards = require('./routes/cards');
const users = require('./routes/users');
const user = require('./routes/user');
app.use('/', users);
app.use('/', cards);
app.use('/', user);
app.get('/*', (req, res) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {
});
app.use(express.static(path.join(__dirname, 'public')));
