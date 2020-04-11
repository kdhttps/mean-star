const blog = require('./blog.model');

function get(req, res) {
  return blog.find({})
    .then((blogs) => {
      return res.send(blogs);
    })
    .catch((error) => {
      logger.error('Failed to get Blog data');
      logger.error(error);
      return res.status(500).send(error);
    })
}

function getById(req, res) {
  return blog.findOne({id: req.params.id})
    .then((blog) => {
      return res.send(blog);
    })
    .catch((error) => {
      logger.error('Failed to get Blog data');
      logger.error(error);
      return res.status(500).send(error);
    })
}

async function save(req, res) {
  const body = req.body;
  const oBlog = await blog.findOne({email: body.email});
  let savedBlog = null;

  if (oBlog) {
    logger.debug('Blog update operation');
    oBlog.name = body.name || oBlog.name;
    oBlog.email = body.email || oBlog.email;
    oBlog.lastLoginTime = Date.now();
    savedBlog = oBlog.save();
  } else {
    logger.debug('Blog add operation');
    const newBlog = new blog({
      name: body.name,
      email: body.email,
      status: 'active'
    });
    savedBlog = newBlog.save();
  }

  return res.send(savedBlog);
}

module.exports = {
  get,
  save
};
