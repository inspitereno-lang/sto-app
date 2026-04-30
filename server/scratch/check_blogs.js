const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Blog = require('../models/Blog');

async function checkBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs.`);

    blogs.forEach(blog => {
      console.log(`Blog: ${blog.title}`);
      console.log(`Translations:`, JSON.stringify(blog.translations, null, 2));
      console.log('---');
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkBlogs();
