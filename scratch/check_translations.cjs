require('dotenv').config();
const mongoose = require('mongoose');

async function check() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/h2o');
  const PageContent = mongoose.model('PageContent', new mongoose.Schema({
    page: String,
    translations: Object
  }), 'pagecontents');

  const page = await PageContent.findOne({ page: 'home_hero' });
  console.log('Home Hero Translations:', JSON.stringify(page.translations, null, 2));
  process.exit(0);
}
check();
