const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let adminToken;
let user;
let adminUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create a regular user
  user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123', role: 'user' });
  await user.save();
  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1h' });

  // Create an admin user
  adminUser = new User({ username: 'admin', email: 'admin@example.com', password: 'password123', role: 'admin' });
  await adminUser.save();
  adminToken = jwt.sign({ id: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('CRUD Operations API', () => {
  
  describe('Categories CRUD', () => {
    let categoryId;

    it('should create a new category (Admin)', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Beverages',
          description: 'Refreshing drinks',
          icon: '🥤'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('name', 'Beverages');
      categoryId = res.body.data._id;
    });

    it('should get all active categories', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should update a category (Admin)', async () => {
      const res = await request(app)
        .put(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Premium Beverages'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('name', 'Premium Beverages');
    });

    it('should delete a category (Admin)', async () => {
      const res = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Category deleted successfully.');
    });
  });

  describe('Products CRUD', () => {
    let productId;
    let categoryId;

    beforeAll(async () => {
      const cat = new Category({ name: 'Test Cat' });
      await cat.save();
      categoryId = cat._id;
    });

    it('should create a new product (Admin)', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Natural Spring Water',
          category: categoryId,
          price: 2.5,
          stock: 100,
          description: 'Fresh water from springs'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('name', 'Natural Spring Water');
      productId = res.body.data._id;
    });

    it('should get all products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get a single product by ID', async () => {
      const res = await request(app).get(`/api/products/${productId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('name', 'Natural Spring Water');
    });

    it('should update a product (Admin)', async () => {
      const res = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 3.0
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('price', 3.0);
    });

    it('should delete a product (Admin)', async () => {
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Product deleted successfully.');
    });
  });

  describe('Auth CRUD (User management)', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('should get all users (Admin)', async () => {
      const res = await request(app)
        .get('/api/auth/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
