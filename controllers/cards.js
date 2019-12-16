/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'ошибка в параметрах' });
      } else res.status(201).send(card);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((card1) => {
            if (!card1) {
              res.status(404).send({ message: 'такой карточки нет' });
            } else res.send(card);
          })
          .catch((err) => res.status(404).send({ message: 'Произошла ошибка' }));
      } else res.status(403).send({ message: 'Нельзя удалять чужие карточки' });
    })
    .catch((err) => res.status(404).send({ message: 'такой карточки нет' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'такой карточки нет' });
      } else res.send(card);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'такой карточки нет' });
      } else res.send(card);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports = {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
};
