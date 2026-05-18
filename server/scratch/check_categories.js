const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const CategorySchema = new mongoose.Schema({}, { strict: false });
    const Category = mongoose.model('Category', CategorySchema, 'categories');

    const categories = await Category.find({});
    console.log('Categories found:', categories.length);

    categories.forEach(cat => {
      console.log('---');
      console.log('ID:', cat._id);
      console.log('Name:', cat.name);
      console.log('Translations (fi):', cat.translations?.fi?.name || 'MISSING');
      console.log('All Translations:', Object.keys(cat.translations || {}));
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkCategories();
