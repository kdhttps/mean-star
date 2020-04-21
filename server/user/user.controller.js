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
    console.log(error);
    logger.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  login,
};
