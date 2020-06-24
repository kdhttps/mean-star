const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();
const userRoute = require('./user/user.route');
const blogRoute = require('./blog/blog.route');
const blogController = require('./blog/blog.controller');
const validationSchema = require('./common/validation-schema');

/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
    message: 'Welcome !!!'
}));

// public routes
router.get('/blogs/ls', blogController.getBlogs);
router.get('/blogs/ls/id/:id', validate(validationSchema.blogGetById), blogController.getBlogById);
router.get('/blogs/ls/title/:title', validate(validationSchema.blogGetByTitle), blogController.getBlogByTitle);
router.get('/blogs/publisher/:id', validate(validationSchema.blogGetByPublisherId), blogController.getBlogByPublisherId);

// protected routes
router.use('/users', authCheck, userRoute);
router.use('/blogs', authCheck, blogRoute);


module.exports = router;
