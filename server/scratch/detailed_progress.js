const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkDetailedProgress() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const pages = await mongoose.connection.db.collection('pagecontents').find({}).toArray();
    
    console.log('--- PageContent Translation Status (fi) ---');
    pages.forEach(p => {
      const isTranslated = p.translations && p.translations.fi ? '✅' : '❌';
      console.log(`${isTranslated} ${p.page}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkDetailedProgress();
