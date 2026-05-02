const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Blog = require('../models/Blog');

async function checkTags() {
  await mongoose.connect(process.env.MONGO_URI);
  const blogs = await Blog.find({});
  const tags = blogs.map(b => b.tags?.[0]);
  console.log('Current tags in DB:', tags);
  process.exit(0);
}
checkTags();
