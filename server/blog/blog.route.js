const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');

router.route('/')
    .get(blogController.get)
    .post(blogController.save);

module.exports = router;
