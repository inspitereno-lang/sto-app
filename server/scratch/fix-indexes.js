require('dotenv').config();
const mongoose = require('mongoose');

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
    
    try {
      await mongoose.connection.db.collection('users').dropIndex('Email_1');
      console.log('Successfully dropped Email_1 index');
    } catch (e) {
      console.log('Email_1 index not found or already dropped');
    }
    
    // Also drop the lowercase one if it exists to let Mongoose recreate it cleanly
    try {
      await mongoose.connection.db.collection('users').dropIndex('email_1');
      console.log('Successfully dropped email_1 index');
    } catch (e) {}

  } catch (error) {
    console.error('Failed to fix indexes:', error);
  } finally {
    await mongoose.disconnect();
  }
}

fixIndexes();
