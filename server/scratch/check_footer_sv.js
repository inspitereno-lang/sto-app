const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkFooterSV() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const footer = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'footer' });
    console.log('--- Footer (sv) ---');
    console.log(JSON.stringify(footer.translations?.sv, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkFooterSV();
