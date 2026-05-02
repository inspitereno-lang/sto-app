const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = require('../models/PageContent');
const Blog = require('../models/Blog');
const Product = require('../models/Product');
const Category = require('../models/Category');

async function fixH2OTranslations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const collections = [
      { model: PageContent, name: 'PageContent' },
      { model: Blog, name: 'Blog' },
      { model: Product, name: 'Product' },
      { model: Category, name: 'Category' }
    ];

    for (const { model, name } of collections) {
      const items = await model.find({});
      console.log(`Checking ${items.length} items in ${name}...`);

      for (const item of items) {
        if (!item.translations) continue;

        let updated = false;
        const translations = item.translations instanceof Map ? Object.fromEntries(item.translations) : item.translations;

        const processObject = (obj) => {
          let localUpdated = false;
          const newObj = JSON.parse(JSON.stringify(obj));
          
          const walk = (o) => {
            for (const key in o) {
              if (typeof o[key] === 'string') {
                const replaced = o[key].replace(/h2o/gi, 'STO');
                if (replaced !== o[key]) {
                  o[key] = replaced;
                  localUpdated = true;
                }
              } else if (typeof o[key] === 'object' && o[key] !== null) {
                walk(o[key]);
              }
            }
          };
          
          walk(newObj);
          return { newObj, localUpdated };
        };

        const { newObj: updatedTranslations, localUpdated } = processObject(translations);
        
        if (localUpdated) {
          item.translations = updatedTranslations;
          item.markModified('translations');
          await item.save();
          console.log(`   Updated translations for ${name}: ${item.page || item.title || item.name}`);
        }
      }
    }

    console.log('Finished fixing H2O translations.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixH2OTranslations();
