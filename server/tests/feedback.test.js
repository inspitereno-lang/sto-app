const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');

let mongoServer;
let adminToken;
let userToken;
let adminUser;
let regularUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create an admin user and get token
  adminUser = new User({ 
    username: 'adminuser', 
    email: 'admin@example.com', 
    password: 'password123', 
    role: 'admin' 
  });
  await adminUser.save();
  adminToken = jwt.sign(
    { id: adminUser._id, role: adminUser.role }, 
    process.env.JWT_SECRET || 'supersecretkey123', 
    { expiresIn: '1h' }
  );

  // Create a regular user and get token
  regularUser = new User({ 
    username: 'regularuser', 
    email: 'user@example.com', 
    password: 'password123', 
    role: 'user' 
  });
  await regularUser.save();
  userToken = jwt.sign(
    { id: regularUser._id, role: regularUser.role }, 
    process.env.JWT_SECRET || 'supersecretkey123', 
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Feedback.deleteMany({});
});

describe('Feedback API', () => {
  const testFeedback = {
    name: 'John Doe',
    email: 'john@example.com',
    rating: 5,
    category: 'Product Quality',
    message: 'Amazing microgreens! Fast delivery.'
  };

  it('should submit feedback successfully (Public)', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send(testFeedback);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(testFeedback.name);
    
    // Verify it exists in DB
    const feedback = await Feedback.findById(res.body._id);
    expect(feedback).toBeTruthy();
    expect(feedback.rating).toEqual(5);
  });

  it('should fail to submit feedback with missing fields', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send({ name: 'Incomplete' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should allow admin to get all feedback', async () => {
    // Insert some feedback first
    await new Feedback(testFeedback).save();
    await new Feedback({ ...testFeedback, name: 'Jane Doe', rating: 4 }).save();

    const res = await request(app)
      .get('/api/feedback')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(2);
  });

  it('should deny non-admin access to view feedback', async () => {
    const res = await request(app)
      .get('/api/feedback')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('Access denied. Admin role required.');
  });

  it('should allow admin to delete feedback', async () => {
    const feedback = await new Feedback(testFeedback).save();
    
    const res = await request(app)
      .delete(`/api/feedback/${feedback._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Feedback removed');

    // Verify it's gone from DB
    const deletedFeedback = await Feedback.findById(feedback._id);
    expect(deletedFeedback).toBeNull();
  });

  it('should deny non-admin access to delete feedback', async () => {
    const feedback = await new Feedback(testFeedback).save();
    
    const res = await request(app)
      .delete(`/api/feedback/${feedback._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('Access denied. Admin role required.');
    
    // Verify it still exists
    const stillThere = await Feedback.findById(feedback._id);
    expect(stillThere).toBeTruthy();
  });
});
