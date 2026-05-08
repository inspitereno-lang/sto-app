const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkHomeHero() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hero = await mongoose.connection.db.collection('pagecontents').findOne({ page: 'home_hero' });
    console.log('--- Home Hero (fi) ---');
    console.log(JSON.stringify(hero.translations?.fi, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkHomeHero();
