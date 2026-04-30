const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const PageContent = require('../models/PageContent');

async function updateLegalContent() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const pages = await PageContent.find({});
    console.log(`Checking ${pages.length} pages...`);

    for (const page of pages) {
      let contentStr = JSON.stringify(page.content);
      let translationsStr = JSON.stringify(page.translations);

      let updated = false;

      // The user specifically said "remove this in it" for the website.
      
      // Clean up website mentions
      const websiteRegex = /Website: [a-z0-9.]+\.(sto\.fi|saanatuatanto\.com)/gi;
      const urlRegex = /https?:\/\/(www\.)?(sto\.fi|saanatuatanto\.com)/gi;
      const contactEmail = 'admin@saanatuatanto.com';
      
      let updatedContent = JSON.stringify(page.content);
      updatedContent = updatedContent.replace(websiteRegex, `Website: ${contactEmail}`);
      updatedContent = updatedContent.replace(urlRegex, 'https://saanatuatanto.com');
      updatedContent = updatedContent.replace(/h2o/gi, 'STO');

      if (contentStr !== updatedContent) {
        contentStr = updatedContent;
        updated = true;
      }

      // Fix email typos and old emails
      const emailPattern = /admin@[a-z0-9.]+\.(fi|com)/gi;
      const correctEmail = 'admin@saanatuatanto.com';

      if (contentStr.match(emailPattern)) {
        console.log(`Checking emails in content of page: ${page.page}`);
        contentStr = contentStr.replace(emailPattern, correctEmail);
        updated = true;
      }

      // Do the same for translations
      if (translationsStr.match(websiteRegex) || translationsStr.match(urlRegex)) {
        console.log(`Found outdated info in translations for page: ${page.page}`);
        translationsStr = translationsStr.replace(websiteRegex, '');
        translationsStr = translationsStr.replace(urlRegex, '');
        updated = true;
      }

      if (translationsStr.match(emailPattern)) {
        console.log(`Checking emails in translations for page: ${page.page}`);
        translationsStr = translationsStr.replace(emailPattern, correctEmail);
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

updateLegalContent();
