import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Failed to connect to MongoDB:');
        console.error(error.message);
        if (error.reason) {
            console.error('Reason:', error.reason);
        }
    }
}

testConnection();
