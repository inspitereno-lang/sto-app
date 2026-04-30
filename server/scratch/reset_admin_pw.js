const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function resetPassword() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    const username = 'reno';
    const newPassword = 'admin123';
    
    const user = await User.findOne({ username });
    
    if (user) {
      user.password = newPassword;
      await user.save();
      console.log(`Password for user "${username}" has been reset to "${newPassword}"`);
    } else {
      console.log(`User "${username}" not found. Creating new admin user...`);
      await User.create({
        username: 'admin',
        email: 'admin@sto.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created with credentials: admin / admin123');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

resetPassword();
