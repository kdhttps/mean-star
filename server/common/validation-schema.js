const { Joi } = require('express-validation');

const schemas = {
  blogSAVE: {
    body: Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
      seoMeta: {
        image: Joi.string().required(),
        url: Joi.string().required(),
        description: Joi.string().required(),
        title: Joi.string().required(),
      },
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
      seoMeta: {
        image: Joi.string().required(),
        url: Joi.string().required(),
        description: Joi.string().required(),
        title: Joi.string().required(),
      },
    }),
  },
  blogGetById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  blogGetByTitle: {
    params: Joi.object({
      title: Joi.string().required(),
    }),
  },
  blogGetByPublisherId: {
    params: Joi.object({
      id: Joi.string().required(),
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
