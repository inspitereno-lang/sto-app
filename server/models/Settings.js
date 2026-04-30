const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  lowStockThreshold: {
    type: Number,
    default: 20,
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
