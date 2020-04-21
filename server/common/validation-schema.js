const Joi = require('@hapi/joi');

const schemas = {
  blogSAVE: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
    },
  },
  userSAVE: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  },
};

module.exports = schemas;
