const request = require('supertest');
const sinon = require('sinon');

const app = require('../index');
const blog = require('../blog/blog.model');

describe('Blog Module', () => {
  after(function (done) {
    app.close(done)
  })

  it('Health Check', (done) => {
    request(app)
      .get('/health-check')
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);

        done();
      });
  });

  it('GET Blogs /blogs/ls', (done) => {

    sinon
      .mock(blog)
      .expects('find')
      .chain('populate')
      .resolves([]);

    request(app)
      .get('/blogs/ls')
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);

        done();
      });
  });
});
