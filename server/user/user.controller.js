const user = require('./user.model');

function get(req, res) {
  return user.find({})
    .then((users) => {
      return res.send(users);
    })
    .catch((error) => {
      logger.error('Failed to get User data');
      logger.error(error);
      return res.status(500).send(error);
    })
}

function getById(req, res) {
  return user.findOne({id: req.params.id})
    .then((user) => {
      return res.send(user);
    })
    .catch((error) => {
      logger.error('Failed to get User data');
      logger.error(error);
      return res.status(500).send(error);
    })
}

function save(req, res) {
  const body = req.body;
  return user.findOne({email: body.email})
    .then(function (oUser) {
      if (oUser) {
        logger.debug('User update operation');
        oUser.name = body.name || oUser.name;
        oUser.email = body.email || oUser.email;
        oUser.lastLoginTime = Date.now();
        return oUser.save();
      }
      logger.debug('User add operation');
      const newUser = new user({
        name: body.name,
        email: body.email,
        status: 'active'
      });
      return newUser.save();
    })
    .then((user) => {
      return res.send(user);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).send(error);
    })
}

module.exports = {
  get,
  save
};
