const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    default: '',
  },
  excerpt: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: 'STO Team',
  },
  category: {
    type: String,
    default: 'Wellness',
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  date: {
    type: String,
  },
  color: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft',
  },
  tags: [{
    type: String,
  }],
  translations: {
    type: Map,
    of: {
      title: String,
      content: String,
      excerpt: String,
      category: String
    },
    default: {}
  },
  translationStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'completed'
  }
}, { timestamps: true });

blogSchema.index({ status: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ date: -1 });

// Auto-generate slug from title
blogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual id field
blogSchema.set('toJSON', {
  virtuals: true,
  flattenMaps: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  },
});

blogSchema.set('toObject', {
  virtuals: true,
  flattenMaps: true,
});

module.exports = mongoose.model('Blog', blogSchema);

