require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

async function elevateReno() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ username: 'reno' });
    if (user) {
      user.role = 'admin';
      await user.save();
      console.log('✅ User reno elevated to admin.');
    } else {
      console.log('❌ User reno not found.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

elevateReno();
