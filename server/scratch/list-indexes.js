require('dotenv').config();
const mongoose = require('mongoose');

async function listIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    const usersCollection = collections.find(c => c.name === 'users');
    
    if (usersCollection) {
      const indexes = await mongoose.connection.db.collection('users').indexes();
      console.log('Indexes for users collection:');
      console.log(JSON.stringify(indexes, null, 2));
    } else {
      console.log('Users collection not found');
    }
  } catch (error) {
    console.error('Failed to list indexes:', error);
  } finally {
    await mongoose.disconnect();
  }
}

listIndexes();
