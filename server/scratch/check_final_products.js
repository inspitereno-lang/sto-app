const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkFinalProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('--- Final Product Names (fi) ---');
    products.forEach(p => {
      console.log(`${p.name} -> ${p.translations?.fi?.name}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkFinalProducts();
