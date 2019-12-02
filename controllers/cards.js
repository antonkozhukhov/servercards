/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'ошибка в параметрах' });
      } else res.send(card);
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((card1) => {
            if (!card1) {
              res.status(404).send({ message: 'такой карточки нет' });
            } else res.send(card);
          });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
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
module.exports.dislikeCard = (req, res) => {
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
