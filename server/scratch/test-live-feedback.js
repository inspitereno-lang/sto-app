require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

async function testLiveFeedback() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected.');

    const testId = new mongoose.Types.ObjectId();
    const testData = {
      name: 'LIVE TEST USER',
      email: 'test@live.com',
      rating: 5,
      category: 'Other',
      message: 'This is a live test message to verify DB persistence and cleanup.'
    };

    console.log('Submitting test feedback...');
    const saved = await Feedback.create(testData);
    console.log('✅ Feedback saved with ID:', saved._id);

    console.log('Verifying persistence...');
    const found = await Feedback.findById(saved._id);
    if (found) {
      console.log('✅ Feedback found in database.');
    } else {
      throw new Error('❌ Feedback NOT found after save!');
    }

    console.log('Cleaning up (removing test feedback)...');
    await Feedback.findByIdAndDelete(saved._id);
    console.log('✅ Feedback removed from MongoDB.');

    const verifiedDeleted = await Feedback.findById(saved._id);
    if (!verifiedDeleted) {
      console.log('✅ Verified: Data is gone.');
    } else {
      console.log('❌ Error: Data still exists!');
    }

  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

testLiveFeedback();
