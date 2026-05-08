const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar'];

async function audit() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('--- Database Audit Results ---');

    const results = {};

    // 1. Page Contents
    const pages = await mongoose.connection.db.collection('pagecontents').find({}).toArray();
    const incompletePages = pages.filter(p => {
      if (!p.translations) return true;
      return LANGUAGES.some(lang => !p.translations[lang]);
    });
    results.pageContents = {
      total: pages.length,
      fullyTranslated: pages.length - incompletePages.length,
      incomplete: incompletePages.map(p => p.page)
    };

    // 2. Products
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    const incompleteProducts = products.filter(p => {
      if (!p.translations) return true;
      return LANGUAGES.some(lang => !p.translations[lang]);
    });
    results.products = {
      total: products.length,
      fullyTranslated: products.length - incompleteProducts.length
    };

    // 3. Categories
    const categories = await mongoose.connection.db.collection('categories').find({}).toArray();
    const incompleteCategories = categories.filter(c => {
      if (!c.translations) return true;
      return LANGUAGES.some(lang => !c.translations[lang]);
    });
    results.categories = {
      total: categories.length,
      fullyTranslated: categories.length - incompleteCategories.length
    };

    // 4. Blogs
    const blogs = await mongoose.connection.db.collection('blogs').find({}).toArray();
    const incompleteBlogs = blogs.filter(b => {
      if (!b.translations) return true;
      return LANGUAGES.some(lang => !b.translations[lang]);
    });
    results.blogs = {
      total: blogs.length,
      fullyTranslated: blogs.length - incompleteBlogs.length
    };

    console.log(JSON.stringify(results, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

audit();
