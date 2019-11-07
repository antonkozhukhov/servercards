/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable space-before-blocks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-trailing-spaces */
const router = require('express').Router(); 
const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../data/users.json'); 
const data = JSON.parse(fs.readFileSync(filepath));
router.get('/users/:id', (req, res) => {
const user = data.find((item) => item._id === req.params.id);   
    if (!user) {
        res.status(404).send({ "message": "Нет пользователя с таким id" });
    }
    res.send(user);
});
module.exports = router;
