const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkHomeCats() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const doc = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'home_categories' });
    console.log('--- Home Categories ---');
    console.log(JSON.stringify(doc, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkHomeCats();
