const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, findUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUser);
router.post('', createUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);
module.exports = router;
