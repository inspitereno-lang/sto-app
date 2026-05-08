const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categories = await mongoose.connection.db.collection('categories').find({}).toArray();
    console.log('--- Categories (fi) ---');
    categories.forEach(c => {
      console.log(`${c.name}: ${JSON.stringify(c.translations?.fi?.name)}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkCategories();
