const express = require('express');
const router = express.Router();
const userRoute = require('./user/user.route');

/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
    message: 'Welcome !!!'
}));

router.use('/users', authCheck, userRoute);

module.exports = router;
