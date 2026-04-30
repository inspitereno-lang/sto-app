const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const adminAuth = require('../middleware/adminAuth');
const Settings = require('../models/Settings');

// GET /api/admin/settings
router.get('/settings', adminAuth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ lowStockThreshold: 20 });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/settings
router.post('/settings', adminAuth, async (req, res) => {
  try {
    const { lowStockThreshold } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    if (lowStockThreshold !== undefined) settings.lowStockThreshold = lowStockThreshold;
    
    await settings.save();

    // Trigger update for all products to reflect new threshold via pre-save hook
    const products = await Product.find({});
    for (const product of products) {
      await product.save();
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const instockProducts = await Product.countDocuments({ stockStatus: 'instock' });
    const lowstockProducts = await Product.countDocuments({ stockStatus: 'lowstock' });
    const outofstockProducts = await Product.countDocuments({ stockStatus: 'outofstock' });
    
    const totalCustomers = await User.countDocuments({ role: 'user' });
    
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
    
    const lowStockItems = await Product.find({ 
      stockStatus: { $ne: 'instock' } 
    }).sort({ stock: 1 }).limit(5);

    res.json({
      summary: {
        totalRevenue,
        orderCount: orders.length,
        inventoryHealth: {
          instock: instockProducts,
          total: totalProducts,
          alerts: lowstockProducts + outofstockProducts
        },
        totalCustomers
      },
      lowStockItems
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
