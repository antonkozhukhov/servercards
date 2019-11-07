/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
const router = require('express').Router(); 
const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../data/users.json'); 
const data = JSON.parse(fs.readFileSync(filepath));
router.get('/users', (req, res) => {
res.send(data);
});
module.exports = router;
