const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkStatus() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const collections = ['products', 'categories', 'blogs', 'pagecontents', 'orders'];
    const status = {};

    for (const collName of collections) {
      const count = await mongoose.connection.db.collection(collName).countDocuments();
      
      // For each collection, check if translations are present in at least one document
      // (This is a rough heuristic)
      const sample = await mongoose.connection.db.collection(collName).findOne();
      const hasTranslations = sample && (sample.translations || sample.localizedName || sample.description_localized);
      
      status[collName] = {
        count,
        hasTranslations: !!hasTranslations
      };
    }

    console.log('\n--- Project Status ---');
    console.table(status);
    
    // Check specific translations for PageContent (since it's critical for UI)
    const pageContentCount = await mongoose.connection.db.collection('pagecontents').countDocuments();
    const localizedPageContent = await mongoose.connection.db.collection('pagecontents').countDocuments({
      'translations.fi': { $exists: true }
    });
    
    console.log(`\nPageContent (Finnish): ${localizedPageContent}/${pageContentCount} items translated.`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkStatus();
