const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function fixCats() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    
    await db.collection('categories').updateOne({ name: 'STO Green' }, { $set: { 'translations.fi.name': 'STO Vihreä' } });
    await db.collection('categories').updateOne({ name: 'STO White' }, { $set: { 'translations.fi.name': 'STO Valkoinen' } });
    await db.collection('categories').updateOne({ name: 'STO Gold' }, { $set: { 'translations.fi.name': 'STO Kulta' } });
    await db.collection('categories').updateOne({ name: 'STO Accessories' }, { $set: { 'translations.fi.name': 'STO Tarvikkeet' } });
    await db.collection('categories').updateOne({ name: 'STO World' }, { $set: { 'translations.fi.name': 'STO Maailma' } });
    
    console.log('✅ Categories fixed.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fixCats();
