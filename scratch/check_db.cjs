require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('./server/models/PageContent');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');
  const pages = await PageContent.find({}, { page: 1, content: 1 });
  console.log(JSON.stringify(pages, null, 2));
  process.exit(0);
}

check();
