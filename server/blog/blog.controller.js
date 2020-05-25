const blog = require('./blog.model');
const user = require('../user/user.model');

async function save(req, res) {
  try {
    const body = req.body;
    const userId = req.user._id;

    __logger.debug('Blog add operation');
    const oBlog = new blog({
      title: body.title,
      content: body.content,
      status: body.status,
      publisher: userId,
    });
    const saveBlog = await oBlog.save();

    __logger.debug('User blogs update operation');
    const oUser = await user.findById(userId);
    oUser.blogs.push(oBlog);
    await oUser.save({
      title: body.title,
      content: body.content,
      status: body.status,
      publisher: userId,
    });

    return res.send(saveBlog);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

async function update(req, res) {
  try {
    const body = req.body;

    __logger.debug('Blog update operation');
    const oBlog = await blog.findById(req.params.id);
    oBlog.title = body.title || oBlog.title;
    oBlog.content = body.content || oBlog.content;
    oBlog.status = body.status || oBlog.status;

    const saveBlog = await oBlog.save();

    return res.send(saveBlog);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

async function getMyBlogs(req, res) {
  try {
    const userId = req.user._id;
    __logger.debug('Get My Blogs ', userId);
    const blogs = await blog.find({ publisher: userId });
    return res.send(blogs);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}


async function getBlogs(req, res) {
  try {
    const blogs = await blog.find({ status: 'PUBLISHED' }).populate('publisher', 'email name -_id');
    return res.send(blogs);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

async function getBlogById(req, res) {
  try {
    const oBlog = await blog.findById(req.params.id).populate('publisher', 'email name -_id');
    return res.send(oBlog);
  } catch (error) {
    __logger.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  save,
  update,
  getMyBlogs,
  getBlogs,
  getBlogById,
};
