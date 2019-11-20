/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'такого пользователя нет' });
      } res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'ошибка в параметрах' });
      } res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет такого пользователя' });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет такого пользователя' });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
