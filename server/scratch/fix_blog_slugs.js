const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Blog = require('../models/Blog');

async function fixSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const blogs = await Blog.find({
      $or: [
        { slug: { $exists: false } },
        { slug: '' },
        { slug: null }
      ]
    });

    console.log(`Found ${blogs.length} blogs missing slugs.`);

    for (const blog of blogs) {
      // Manually trigger slug generation if not present
      blog.slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      await blog.save();
      console.log(`Fixed slug for: "${blog.title}" -> "${blog.slug}"`);
    }

    console.log('Successfully updated all missing slugs.');
  } catch (err) {
    console.error('Error fixing slugs:', err);
  } finally {
    await mongoose.connection.close();
  }
}

fixSlugs();
