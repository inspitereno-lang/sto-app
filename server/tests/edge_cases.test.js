const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

let mongoServer;
let userToken;
let adminToken;
let regularUser;
let adminUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create a regular user
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

  // Create an admin user
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
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Edge Cases and Security Tests', () => {

  describe('Auth Edge Cases', () => {
    it('should fail to register with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'anotheruser',
          email: 'user@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(409);
      expect(res.body.message).toMatch(/User already exists/i);
    });

    it('should fail login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Invalid credentials/i);
    });

    it('should fail login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Invalid credentials/i);
    });

    it('should fail with malformed token', async () => {
      const res = await request(app)
        .get('/api/auth/admin/users')
        .set('Authorization', 'Bearer malformedtoken');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Invalid or expired token/i);
    });
  });

  describe('Authorization Edge Cases (Security)', () => {
    it('should deny a regular user from updating products (Admin Only)', async () => {
      const cat = new Category({ name: 'Test Cat' });
      await cat.save();
      const product = new Product({
        name: 'Secured Product',
        category: cat._id,
        price: 10
      });
      await product.save();

      const res = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ price: 20 });
      
      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toMatch(/Admin role required/i);
    });

    it('should deny a regular user from viewing all orders (Admin Only)', async () => {
      const res = await request(app)
        .get('/api/orders/admin/all')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toMatch(/Admin role required/i);
    });

    it('SHOULD deny a regular user from creating blogs (Security Check)', async () => {
      // NOTE: This currently fails because blogs use 'auth' instead of 'adminAuth'
      const res = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Hacked Blog' });
      
      // If it passes with 201, it's a security flaw
      // We expect 403 if it was secure
      expect(res.statusCode).toEqual(403); 
    });
  });

  describe('Validation and Not Found Edge Cases', () => {
    it('should return 404 for non-existent product ID', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/products/${fakeId}`);
      expect(res.statusCode).toEqual(404);
    });

    it('should return 404 for non-existent blog ID/slug', async () => {
      const res = await request(app).get('/api/blogs/non-existent-slug');
      expect(res.statusCode).toEqual(404);
    });

    it('should return 400 when creating product without required fields', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 10 }); // Missing name and category
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Name and category are required/i);
    });
  });
});
