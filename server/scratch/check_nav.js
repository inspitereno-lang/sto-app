const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkNav() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const nav = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'nav' });
    console.log(JSON.stringify(nav, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkNav();
