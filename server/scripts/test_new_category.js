const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Category = require('../models/Category');
const { triggerTranslation } = require('../utils/translate');

async function testNewCategory() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('1. Connected to MongoDB');

    // Remove existing test category if any
    await Category.deleteOne({ slug: 'sto-accessories' });

    // 2. Create a new category in English
    const newCat = await Category.create({
      name: "STO Accessories",
      description: "Premium additions for your nordic lifestyle.",
      icon: "✨",
      color: "#B8860B",
      isActive: true
    });
    console.log('2. Created "STO Accessories" in English.');

    // 3. Trigger translation
    console.log('3. Triggering automatic translations...');
    triggerTranslation();

    console.log('4. Waiting 10 seconds for translations to complete...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 4. Check if translations exist
    const updatedCat = await Category.findById(newCat._id);
    const trans = updatedCat.translations instanceof Map ? Object.fromEntries(updatedCat.translations) : updatedCat.translations;
    
    console.log('--- TEST RESULTS ---');
    console.log('Category Name:', updatedCat.name);
    console.log('Category Slug:', updatedCat.slug);
    console.log('Category Link:', updatedCat.link);
    
    if (trans && trans.fi) {
      console.log('✅ Finnish Translation:', trans.fi.name);
      console.log('✅ Finnish Description:', trans.fi.description);
    } else {
      console.log('❌ Finnish Translation missing.');
    }

    if (trans && trans.sv) {
      console.log('✅ Swedish Translation:', trans.sv.name);
    }

    console.log('---------------------');
    
    // Cleanup: Remove the test category
    // await Category.deleteOne({ _id: newCat._id });
    // console.log('5. Cleaned up test category.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testNewCategory();
