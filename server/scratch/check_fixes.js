const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkFooterAndMicrogreens() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const footer = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'footer' });
    console.log('--- Footer Languages ---');
    console.log(Object.keys(footer.translations || {}));

    const microgreens = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'home_microgreens' });
    console.log('\n--- Home Microgreens (fi) ---');
    console.log(JSON.stringify(microgreens.translations?.fi, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkFooterAndMicrogreens();
