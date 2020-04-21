const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const validator = require('../common/validator');
const validatorSchema = require('../common/validation-schema');

router.route('/login')
  .get(userController.login);

router.route('/')
  .post(validator(validatorSchema.userSAVE.body, 'body'), userController.login);

module.exports = router;
