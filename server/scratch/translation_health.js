const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

async function checkTranslationHealth() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for Health Check\n');

    const collections = ['products', 'blogs', 'categories', 'pagecontents'];
    const report = {};

    for (const collName of collections) {
      const docs = await mongoose.connection.db.collection(collName).find({}).toArray();
      const total = docs.length;
      const translated = docs.filter(d => d.translations && Object.keys(d.translations).length >= 15).length;
      const partial = docs.filter(d => d.translations && Object.keys(d.translations).length > 0 && Object.keys(d.translations).length < 15).length;
      
      report[collName] = {
        total,
        fullyTranslated: translated,
        partiallyTranslated: partial,
        notTranslated: total - translated - partial
      };
    }

    console.table(report);
    
    // Overall score
    const totalDocs = Object.values(report).reduce((a, b) => a + b.total, 0);
    const fullyTrans = Object.values(report).reduce((a, b) => a + b.fullyTranslated, 0);
    const score = (fullyTrans / totalDocs) * 10;
    
    console.log(`\nOverall Translation Health Score: ${score.toFixed(1)}/10`);
    
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkTranslationHealth();
