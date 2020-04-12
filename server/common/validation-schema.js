const Joi = require('@hapi/joi');

const schemas = {
  blogPOST: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
    }
  },
};

module.exports = schemas;
