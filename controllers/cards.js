
const Card = require('../models/card');
const NotFoundCardError = require('../middlewares/not-found-card-error');
const ParametersError = require('../middlewares/parameters-error');
const NotFoundError = require('../middlewares/not-found-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};
const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new ParametersError('ошибка в параметрах');
      } else res.status(201).send(card);
    })
    .catch(next);
};
const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((card1) => {
            if (!card1) {
              throw new NotFoundError('такой карточки нет');
            } else res.send(card);
          })
          .catch(next);
      } else throw new NotFoundCardError('Нельзя удалять чужие карточки');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('такой карточки нет');
      } else res.send(card);
    })
    .catch(next);
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('такой карточки нет');
      } else res.send(card);
    })
    .catch(next);
};
module.exports = {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
};
