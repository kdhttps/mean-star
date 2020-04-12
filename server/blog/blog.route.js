const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');
const validator = require('../common/validator');
const validationSchema = require('../common/validation-schema');

router.route('/')
    .get(blogController.get)
    .post(validator(validationSchema.blogPOST), blogController.save);

module.exports = router;
