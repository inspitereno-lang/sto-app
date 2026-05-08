const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkLabelsFI() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const productsPage = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'products' });
    console.log('--- Products UI Labels (fi) ---');
    console.log(JSON.stringify(productsPage.translations?.fi, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkLabelsFI();
