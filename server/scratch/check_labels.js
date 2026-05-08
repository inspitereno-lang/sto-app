const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkLabels() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const productsPage = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'products' });
    console.log('--- Products UI Labels ---');
    console.log(JSON.stringify(productsPage, null, 2));

    const kit = await mongoose.connection.db.collection('products').findOne({ name: 'Artisan Microgreens Kit' });
    console.log('\n--- Artisan Microgreens Kit (fi) ---');
    console.log(JSON.stringify(kit?.translations?.fi, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkLabels();
