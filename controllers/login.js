const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../middlewares/auth-error');
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send(token);
    })
    .catch((err) => {
      throw new AuthError('Необходима1 авторизация');
    });
};
