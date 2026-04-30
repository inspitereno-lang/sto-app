const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function count() {
  try {
    await mongoose.connect(MONGO_URI);
    const collections = ['blogs', 'products', 'categories', 'pagecontents'];
    for (const coll of collections) {
      const count = await mongoose.connection.db.collection(coll).countDocuments({});
      console.log(`${coll}: ${count}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

count();
