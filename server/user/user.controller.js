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

function post(req, res) {
    console.log(req.body);
    const body = req.body;
    const oUser = new user({
        name: body.name,
        username: body.username,
        password: body.password,
        status: 'active'
    });
    return oUser.save()
        .then((user) => {
            return res.send(user);
        })
        .catch((error) => {
            logger.error('Failed to add User data');
            logger.error(error);
            return res.status(500).send(error);
        })
}

module.exports = {
    get,
    post
};
