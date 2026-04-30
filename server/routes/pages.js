const express = require('express');
const PageContent = require('../models/PageContent');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { triggerTranslation } = require('../utils/translate');

const router = express.Router();

// GET /api/pages - Public: list all page contents
router.get('/', async (req, res) => {
  try {
    const pages = await PageContent.find();
    res.json({ data: pages });
  } catch (err) {
    console.error('Get pages error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/pages/:page - Public: get single page content
router.get('/:page', async (req, res) => {
  try {
    const page = await PageContent.findOne({ page: req.params.page });
    if (!page) {
      return res.status(404).json({ message: 'Page content not found.' });
    }
    res.json({ data: page });
  } catch (err) {
    console.error('Get page error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/pages/:page - Protected: update page content (Admin Only)
router.put('/:page', adminAuth, async (req, res) => {
  try {
    const { content } = req.body;

    let page = await PageContent.findOne({ page: req.params.page });
    
    if (!page) {
      page = new PageContent({ page: req.params.page, content });
    } else {
      // Merge new content with existing
      page.content = { ...page.content, ...content };
    }

    await page.save();

    // Trigger background translation
    triggerTranslation();

    res.json({ data: page });
  } catch (err) {
    console.error('Update page error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
