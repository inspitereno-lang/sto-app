const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function checkAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    const User = mongoose.connection.db.collection('users');
    const admin = await User.findOne({ username: 'admin' });
    
    if (admin) {
      console.log('Admin user found:', {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        email: admin.email
      });
    } else {
      console.log('Admin user NOT found');
    }
    
    const allUsers = await User.find({}).toArray();
    console.log('Total users count:', allUsers.length);
    console.log('Users list:', allUsers.map(u => ({ username: u.username, role: u.role, email: u.email })));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

checkAdmin();
