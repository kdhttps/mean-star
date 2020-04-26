const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { validate } = require('express-validation');
const validatorSchema = require('../common/validation-schema');

router.route('/login')
  .get(userController.login);

router.route('/')
  .post(validate(validatorSchema.userSAVE), userController.login);

module.exports = router;
