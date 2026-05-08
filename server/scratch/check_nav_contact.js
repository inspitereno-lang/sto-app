const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkNavExtra() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const nav = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'nav' });
    console.log('--- Nav Translations ---');
    console.log(JSON.stringify(nav.translations?.fi, null, 2));

    const contact = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'contact_page' });
    console.log('\n--- Contact Page Content ---');
    console.log(JSON.stringify(contact?.content, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkNavExtra();
