const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkFinalCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const cats = await mongoose.connection.db.collection('categories').find({}).toArray();
    console.log('--- Final Categories (fi) ---');
    cats.forEach(c => {
      console.log(`${c.name} -> ${c.translations?.fi?.name}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkFinalCategories();
