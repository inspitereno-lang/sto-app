const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'contact', 'blog', 'footer'
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  translations: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
