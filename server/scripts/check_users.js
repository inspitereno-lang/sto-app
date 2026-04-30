const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sto');
    console.log('Connected to MongoDB');

    const allUsers = await User.find();
    console.log(`Total users found: ${allUsers.length}`);

    const admins = allUsers.filter(u => u.role === 'admin');
    const customers = allUsers.filter(u => u.role === 'user');

    console.log(`Admins (${admins.length}):`);
    admins.forEach(u => console.log(`- ${u.username} (${u.email})`));

    console.log(`Customers (${customers.length}):`);
    customers.forEach(u => console.log(`- ${u.username} (${u.email})`));

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkUsers();
