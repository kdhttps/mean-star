const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['PUBLISHED', 'UNPUBLISHED'],
  },
  publisher: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User',
  }],
  publishedAt: {
    type: Date,
  },
  seoMeta: {
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
