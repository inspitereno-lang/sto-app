const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  stockStatus: {
    type: String,
    enum: ['instock', 'lowstock', 'outofstock'],
    default: 'instock',
  },
  image: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  shortDescription: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  nutrition: [{
    type: String,
  }],
  flavorNotes: {
    type: String,
    default: '',
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  translations: {
    type: Map,
    of: {
      name: String,
      shortDescription: String,
      description: String,
      flavorNotes: String
    },
    default: {}
  },
  translationStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'completed'
  }
}, { timestamps: true, suppressReservedKeysWarning: true });

productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ stockStatus: 1 });

productSchema.pre('save', async function(next) {
  try {
    const Settings = mongoose.model('Settings');
    let settings = await Settings.findOne();
    const threshold = settings ? settings.lowStockThreshold : 20;

    if (this.stock <= 0) {
      this.stockStatus = 'outofstock';
    } else if (this.stock <= threshold) {
      this.stockStatus = 'lowstock';
    } else {
      this.stockStatus = 'instock';
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Virtual id field for frontend compatibility
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  },
});

module.exports = mongoose.model('Product', productSchema);
