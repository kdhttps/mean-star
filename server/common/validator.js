const Joi = require('@hapi/joi');

function validator(schema) {
  return (req, res, next) => {
    const validSchema = Joi.object(schema);
    const {error} = validSchema.validate(req);
    const valid = error == null;
    if (valid) {
      return next();
    }
    const {details} = error;
    const message = details.map(i => i.message).join(',');
    logger.error(message);
    return res.status(422).json({error: message});
  }
}

module.exports = validator;
