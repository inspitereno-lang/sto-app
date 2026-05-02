const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Blog = require('../models/Blog');

const TAG_MAP = {
  'fi': {
    'Science': 'Tiede',
    'Health': 'Terveys',
    'Our Process': 'Meidän prosessimme',
    'Guide': 'Opas',
    'Nutrition Science': 'Ravitsemustiede',
    'Wellness': 'Hyvinvointi',
    'Behind the Scenes': 'Kulissien takana',
    'Beginner\'s Guide': 'Aloittelijan opas'
  }
};

async function updateBlogTags() {
  await mongoose.connect(process.env.MONGO_URI);
  const blogs = await Blog.find({});
  
  for (const blog of blogs) {
    if (!blog.translations) continue;
    
    const translations = blog.translations instanceof Map ? Object.fromEntries(blog.translations) : blog.translations;
    let updated = false;

    for (const [lang, trans] of Object.entries(translations)) {
      if (TAG_MAP[lang]) {
        const enTags = blog.tags || [];
        trans.tags = enTags.map(tag => TAG_MAP[lang][tag] || tag);
        updated = true;
      }
    }

    if (updated) {
      blog.translations = translations;
      blog.markModified('translations');
      await blog.save();
    }
  }
  console.log('Updated blog tags in translations');
  process.exit(0);
}

updateBlogTags();
