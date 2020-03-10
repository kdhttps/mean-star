const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.route('/')
    .get(userController.get)
    .post(userController.post);

module.exports = router;
