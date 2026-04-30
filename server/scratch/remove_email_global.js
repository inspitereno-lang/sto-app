const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const PageContent = require('../models/PageContent');

async function removeEmailFromDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const pages = await PageContent.find({});
    console.log(`Checking ${pages.length} pages...`);

    for (const page of pages) {
      let contentStr = JSON.stringify(page.content);
      let translationsStr = JSON.stringify(page.translations);

      let updated = false;

      const emailRegex = /admin@saanatuatanto\.com/gi;

      if (contentStr.match(emailRegex)) {
        console.log(`Removing email from content of page: ${page.page}`);
        contentStr = contentStr.replace(emailRegex, '');
        updated = true;
      }

      if (translationsStr.match(emailRegex)) {
        console.log(`Removing email from translations for page: ${page.page}`);
        translationsStr = translationsStr.replace(emailRegex, '');
        updated = true;
      }

      if (updated) {
        page.content = JSON.parse(contentStr);
        page.translations = JSON.parse(translationsStr);
        await page.save();
        console.log(`Updated page: ${page.page}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

removeEmailFromDB();
