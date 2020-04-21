const Joi = require('@hapi/joi');

function validator(schema, element) {
  return (req, res, next) => {
    const validSchema = Joi.object(schema);
    const {error} = validSchema.validate(req[element]);
    const valid = error == null;
    if (valid) {
      return next();
    }
    logger.error('validator error');
    logger.error(error);
    const {details} = error;
    const message = details.map(i => i.message).join(',');
    return res.status(422).json({error: message});
  }
}

module.exports = validator;
