const got = require('got');
const LRU = require('lru-cache');

const user = require('./user.model');
const caches = new LRU(1000);
const utils = require('../common/utils');

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
      __logger.debug('User update operation');
      oUser.name = userInfo.name || oUser.name;
      oUser.email = userInfo.email || oUser.email;
      oUser.lastLoginTime = Date.now();
      if (oUser.authTokens.indexOf(authToken) < 0) {
        oUser.authTokens.push(authToken)
      }
      savedUser = await oUser.save();
    } else {
      __logger.debug('User add operation');
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
    __logger.error(error);
    return res.status(500).send(error);
  }
}

async function isRevokedCallback(req, payload, done) {
  try {
    if (req.method === 'GET' && req.originalUrl === '/users/login') {
      return done(null, false)
    }
    const authToken = req.headers.authorization.split(' ')[1];
    let cachedUser = caches.get(authToken);
    
    if (cachedUser) {
      __logger.debug('Fetched user from cache');
      req.user = cachedUser;
    } else {
      __logger.debug('Fetching user from db');
      const oUsers = await user.find({authTokens: authToken});
      if (!oUsers) {
        __logger.error(`User not found with token ${authToken}`);
        return done({message: 'User not found'}, true);
      }

      if (oUsers.length > 1) {
        __logger.error(`Multiple Users has same token ${authToken}`);
        return done({message: 'Untrusted token'}, true);
      }
      req.user = oUsers[0];
    }

    // decode token
    const payload = utils.decode(authToken);
    caches.set(authToken, req.user, payload.exp - payload.iat);
    return done(null, false);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  login,
  isRevokedCallback,
};
