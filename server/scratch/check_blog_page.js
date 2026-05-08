const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkBlogPage() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const blogPage = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'blog_page' });
    console.log('--- Blog Page Content ---');
    console.log(JSON.stringify(blogPage, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkBlogPage();
