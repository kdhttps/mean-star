const blog = require('./blog.model');

async function save(req, res) {
  try {
    console.log(req.user);
    const body = req.body;
    logger.debug('Blog add operation');
    const oBlog = await new blog({
      title: body.title,
      content: body.content,
      status: body.status,
    });

    oBlog.save();

    return res.send();
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  save,
};
