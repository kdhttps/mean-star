const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');
const { validate } = require('express-validation');
const validationSchema = require('../common/validation-schema');

router.route('/')
    .post(validate(validationSchema.blogSAVE, {}, {}), blogController.save);

module.exports = router;
