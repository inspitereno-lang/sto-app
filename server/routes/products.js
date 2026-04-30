const express = require('express');
const Product = require('../models/Product');
const adminAuth = require('../middleware/adminAuth');
const { triggerTranslation } = require('../utils/translate');

const router = express.Router();

// GET /api/products - Public: list all products
router.get('/', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ data: products });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/products/:id - Public: get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ data: product });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/products - Protected: create product
router.post('/', adminAuth, async (req, res) => {
  try {
    const {
      name, category, price, stock, stockStatus,
      image, images, shortDescription, description,
      nutrition, flavorNotes, isNew, isFeatured
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required.' });
    }

    const product = await Product.create({
      name,
      category,
      price: price || 0,
      stock: stock || 0,
      stockStatus: stockStatus || 'instock',
      image: image || '',
      images: images || [],
      shortDescription: shortDescription || '',
      description: description || '',
      nutrition: nutrition || [],
      flavorNotes: flavorNotes || '',
      isNew: isNew || false,
      isFeatured: isFeatured || false,
      translationStatus: 'pending'
    });
    
    // Trigger background translation
    triggerTranslation();

    res.status(201).json({ data: product });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/products/:id - Protected: update product
router.put('/:id', adminAuth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    Object.assign(product, { ...req.body, translationStatus: 'pending' });
    await product.save();

    // Trigger background translation
    triggerTranslation();

    res.json({ data: product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/products/:id - Protected: delete product
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
