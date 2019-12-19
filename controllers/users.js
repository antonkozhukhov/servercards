/* eslint-disable no-unused-vars */

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ParametersError = require('../middlewares/parameters-error');
const NotFoundError = require('../middlewares/not-found-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};
const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('такого пользователя нет');
      } else res.send(user);
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => {
        if (!user) {
          throw new ParametersError('ошибка1 в параметрах');
        } else res.status(201).send(user);
      })
      .catch(next);
  } else throw new ParametersError('ошибка2 в параметрах');
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('такого пользователя нет');
      } else res.send(user);
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('такого пользователя нет');
      } else res.send(user);
    })
    .catch(next);
};
module.exports = {
  getUsers, findUser, createUser, updateUser, updateAvatar,
};
