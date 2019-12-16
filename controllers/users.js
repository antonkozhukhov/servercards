/* eslint-disable no-unused-vars */

const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'такого пользователя нет' });
      } else res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          if (!user) {
            res.status(400).send({ message: 'ошибка в параметрах' });
          } else res.status(201).send(user);
        })
        .catch((err) => res.status(500).send({ message: 'Произошла ошибка' })));
  } else res.status(404).send({ message: 'ошибка в параметрах' });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет такого пользователя' });
      } else res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет такого пользователя' });
      } else res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports = {
  getUsers, findUser, createUser, updateUser, updateAvatar,
};
