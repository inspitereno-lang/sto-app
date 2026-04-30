const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { triggerTranslation } = require('../utils/translate');

const router = express.Router();

// GET /api/blogs - Public: list all blogs
router.get('/', async (req, res) => {
  try {
    const { status, lang } = req.query;
    let filter = {};

    // If no auth header, only show published blogs (public view)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      filter.status = 'Published';
    } else if (status) {
      filter.status = status;
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    if (lang && lang !== 'en') {
      const translatedBlogs = blogs.map(blog => {
        if (blog.translations && blog.translations.has(lang)) {
          const trans = blog.translations.get(lang);
          const blogObj = blog.toObject();
          return {
            ...blogObj,
            title: trans.title || blog.title,
            content: trans.content || blog.content,
            excerpt: trans.excerpt || blog.excerpt,
            category: trans.category || blog.category,
            isTranslated: true
          };
        }
        return blog;
      });
      return res.json(translatedBlogs);
    }

    res.json(blogs);
  } catch (err) {
    console.error('Get blogs error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});


// GET /api/blogs/:idOrSlug - Public: get single blog
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { lang } = req.query;
    let blog = await Blog.findById(req.params.idOrSlug).catch(() => null);
    if (!blog) {
      blog = await Blog.findOne({ slug: req.params.idOrSlug });
    }
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // If lang is provided and exists in translations, merge it
    if (lang && lang !== 'en' && blog.translations && blog.translations.has(lang)) {
      const trans = blog.translations.get(lang);
      const blogObj = blog.toObject();
      return res.json({
        ...blogObj,
        title: trans.title || blog.title,
        content: trans.content || blog.content,
        excerpt: trans.excerpt || blog.excerpt,
        category: trans.category || blog.category,
        isTranslated: true
      });
    }

    res.json(blog);
  } catch (err) {
    console.error('Get blog error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});


// POST /api/blogs - Protected: create blog (Admin Only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, content, excerpt, image, author, status, tags, category, readTime, date, color } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Blog title is required.' });
    }

    const blog = await Blog.create({
      title,
      content: content || '',
      excerpt: excerpt || '',
      image: image || '',
      author: author || 'STO Team',
      status: status || 'Draft',
      tags: tags || [],
      category: category || 'Wellness',
      readTime: readTime || '5 min read',
      date: date || '',
      color: color || '#1B3A2D',
      translationStatus: 'pending'
    });
    
    // Trigger background translation
    triggerTranslation();

    res.status(201).json(blog);
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/blogs/:id - Protected: update blog (Admin Only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, translationStatus: 'pending' },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Trigger background translation
    triggerTranslation();

    res.json(blog);
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/blogs/:id - Protected: delete blog (Admin Only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
