const blog = require('./blog.model');
const user = require('../user/user.model');

async function save(req, res) {
  try {
    const body = req.body;
    const userId = req.user._id;

    __logger.debug('Blog add operation');
    const oBlog = await new blog({
      title: body.title,
      content: body.content,
      status: body.status,
      publisher: userId,
    });
    const saveBlog = await oBlog.save();
    __logger.debug('User blog update operation');
    const oUser = await user.findById(userId);
    oUser.blogs.push(oBlog);
    await oUser.save();

    return res.send(saveBlog);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  save,
};
