const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
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
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '📦',
  },
  image: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#1B3A2D',
  },
  link: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  translations: {
    type: Map,
    of: {
      name: String,
      description: String
    },
    default: {}
  }
}, { timestamps: true });

// Auto-generate slug from name
categorySchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual id field for frontend compatibility
categorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  },
});

module.exports = mongoose.model('Category', categorySchema);
