const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkFooterAR() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const footer = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'footer' });
    console.log('--- Footer (ar) ---');
    console.log(JSON.stringify(footer.translations?.ar, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkFooterAR();
