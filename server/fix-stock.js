require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function fixStockStatus() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Checking ${products.length} products...`);

    for (let p of products) {
      let oldStatus = p.stockStatus;
      if (p.stock <= 0) p.stockStatus = 'outofstock';
      else if (p.stock <= 10) p.stockStatus = 'lowstock';
      else p.stockStatus = 'instock';

      if (oldStatus !== p.stockStatus) {
        console.log(`Updating ${p.name}: ${oldStatus} -> ${p.stockStatus} (Stock: ${p.stock})`);
        await p.save();
      }
    }

    console.log('Stock status fix complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixStockStatus();
