const { Joi } = require('express-validation');

const schemas = {
  blogSAVE: {
    body: Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
    }),
  },
  blogUpdate: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
    }),
  },
  userSAVE: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    }),
  },
};

module.exports = schemas;
