require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

async function checkUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected.');

    const users = await User.find({}, 'username email role password');
    console.log('--- Current Users in Database ---');
    if (users.length === 0) {
      console.log('No users found.');
    } else {
      users.forEach(u => {
        console.log(`Username: ${u.username}, Email: ${u.email}, Role: ${u.role}`);
      });
    }

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

checkUsers();
