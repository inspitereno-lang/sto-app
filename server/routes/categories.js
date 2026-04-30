const express = require('express');
const Category = require('../models/Category');
const adminAuth = require('../middleware/adminAuth');
const { triggerTranslation } = require('../utils/translate');

const router = express.Router();

// GET /api/categories - Public: list all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: 1 });
    res.json({ data: categories });
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/categories/:id - Public: get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    res.json({ data: category });
  } catch (err) {
    console.error('Get category error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/categories - Protected: create category
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, icon, image, color, link } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const category = await Category.create({
      name,
      description: description || '',
      icon: icon || '📦',
      image: image || '',
      color: color || '#1B3A2D',
      link: link || `/shop?cat=${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    });
    
    // Trigger background translation
    triggerTranslation();

    res.status(201).json({ data: category });
  } catch (err) {
    console.error('Create category error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/categories/:id - Protected: update category
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, icon, image, color, link, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, icon, image, color, link, isActive },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Trigger background translation
    triggerTranslation();

    res.json({ data: category });
  } catch (err) {
    console.error('Update category error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/categories/:id - Protected: delete category
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    res.json({ message: 'Category deleted successfully.' });
  } catch (err) {
    console.error('Delete category error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
