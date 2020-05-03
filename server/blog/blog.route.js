const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');
const { validate } = require('express-validation');
const validationSchema = require('../common/validation-schema');

router.route('/')
    .post(validate(validationSchema.blogSAVE), blogController.save);

router.route('/:id')
    .put(validate(validationSchema.blogUpdate), blogController.update);

router.route('/user')
    .get(blogController.getMyBlogs);

module.exports = router;
