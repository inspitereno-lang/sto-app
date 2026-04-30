require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected.');

    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@sto.com';

    // Check if exists
    const existing = await User.findOne({ username });
    if (existing) {
      console.log('Admin user already exists. Updating password and role...');
      existing.password = password;
      existing.role = 'admin';
      await existing.save();
      console.log('✅ Admin updated.');
    } else {
      console.log('Creating new admin user...');
      await User.create({
        username,
        email,
        password,
        role: 'admin'
      });
      console.log('✅ Admin created successfully.');
    }

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

createAdmin();
