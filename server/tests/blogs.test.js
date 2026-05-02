const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');

let mongoServer;
let adminToken;
let adminUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create an admin user for authentication
  adminUser = new User({ username: 'admin', email: 'admin@example.com', password: 'password123', role: 'admin' });
  await adminUser.save();
  adminToken = jwt.sign({ id: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Blog Category Logic Tests', () => {
  
  it('should create a blog with a manually typed custom category', async () => {
    const customCategory = "Experimental Nordic Farming";
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Future of Farming',
        content: 'Content about custom categories...',
        category: customCategory,
        status: 'Published'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('category', customCategory);
  });

  it('should update a blog to another manually typed custom category', async () => {
    // First create a blog
    const blog = await Blog.create({
      title: 'Initial Blog',
      content: 'Initial content',
      category: 'Old Category',
      status: 'Published'
    });

    const newCustomCategory = "Hyper-Local Sustainability";
    const res = await request(app)
      .put(`/api/blogs/${blog._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        category: newCustomCategory
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('category', newCustomCategory);
    
    // Verify it's actually in the DB
    const updatedBlog = await Blog.findById(blog._id);
    expect(updatedBlog.category).toEqual(newCustomCategory);
  });

  it('should allow using an existing "Early Data" category string', async () => {
    const earlyCategory = "Nutrition Science";
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Science Post',
        content: 'Some science...',
        category: earlyCategory
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('category', earlyCategory);
  });

  it('should fail to create a blog without a category (since it is required)', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Missing Category Post',
        content: 'This should fail'
        // category missing
      });

    expect(res.statusCode).toEqual(500); // Mongoose validation error usually results in 500 in this setup
  });

});
