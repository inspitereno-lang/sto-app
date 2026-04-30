require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function testRegister() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
    
    const username = 'test_reg_' + Date.now();
    const password = 'password123';
    
    console.log('Creating user:', username);
    const user = await User.create({
      username: username.toLowerCase(),
      password,
      role: 'user',
    });
    
    console.log('User created successfully:', user._id);
    await User.deleteOne({ _id: user._id });
    console.log('Test user cleaned up');
  } catch (error) {
    console.error('Registration test failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testRegister();
