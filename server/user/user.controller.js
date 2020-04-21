const got = require('got');
const user = require('./user.model');

async function login(req, res) {
  try {
    const authToken = req.headers.authorization.split(' ')[1];
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      url: process.env.OP_SERVER_URL + process.env.USERINFO_ENDPOINT,
      responseType: 'json',
    };

    const response = await got(option);
    const userInfo = response.body;
    const oUser = await user.findOne({email: userInfo.email});
    let savedUser = null;

    if (oUser) {
      logger.debug('User update operation');
      oUser.name = userInfo.name || oUser.name;
      oUser.email = userInfo.email || oUser.email;
      oUser.lastLoginTime = Date.now();
      if(!(oUser.authTokens && oUser.authTokens.indexOf(authToken))) {
        oUser.authTokens = [authToken];
      }

      savedUser = await oUser.save();
    } else {
      logger.debug('User add operation');
      const newUser = new user({
        name: userInfo.name,
        email: userInfo.email,
        status: 'active',
        authTokens: [authToken]
      });
      savedUser = await newUser.save();
    }

    return res.send(savedUser);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}

async function isRevokedCallback(req, payload, done) {
  if (req.method === 'GET' && req.originalUrl === '/users/login') {
    console.log('inside');
    return done(null, false)
  }
  const authToken = req.headers.authorization.split(' ')[1];
  const oUsers = await user.find({authTokens: authToken});
  if(!oUsers) {
    logger.error(`User not found with token ${authToken}`);
    return done({message: 'User not found'}, true);
  }

  if(oUsers.length > 1) {
    logger.error(`Multiple Users has same token ${authToken}`);
    return done({message: 'Untrusted token'}, true);
  }
  const oUser = oUsers[0];
  req.user = oUser;
  return done(null, false);
}

module.exports = {
  login,
  isRevokedCallback,
};
