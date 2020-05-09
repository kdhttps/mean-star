const express = require('express');
const router = express.Router();
const userRoute = require('./user/user.route');
const blogRoute = require('./blog/blog.route');
const blogController = require('./blog/blog.controller');

/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
    message: 'Welcome !!!'
}));

// public routes
router.get('/blogs/ls', blogController.getBlogs);

// protected routes
router.use('/users', authCheck, userRoute);
router.use('/blogs', authCheck, blogRoute);


module.exports = router;
