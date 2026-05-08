const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkCartCheckout() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const cart = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'cart' });
    console.log('--- Cart UI (fi) ---');
    console.log(JSON.stringify(cart.translations?.fi, null, 2));

    const checkout = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'checkout' });
    console.log('\n--- Checkout UI (fi) ---');
    console.log(JSON.stringify(checkout.translations?.fi, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkCartCheckout();
