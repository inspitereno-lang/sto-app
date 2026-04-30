const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Mock Razorpay
jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => {
    return {
      orders: {
        create: jest.fn().mockResolvedValue({
          id: 'order_mock123',
          entity: 'order',
          amount: 5000,
          amount_paid: 0,
          amount_due: 5000,
          currency: 'EUR',
          receipt: 'receipt_order_123',
          status: 'created',
          attempts: 0,
          notes: [],
          created_at: 1620000000
        })
      }
    };
  });
});

let mongoServer;
let token;
let user;
let product;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Close any existing connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create a user and get token
  user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123', role: 'user' });
  await user.save();
  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1h' });

  // Create a product
  product = new Product({
    name: 'Test Product',
    category: new mongoose.Types.ObjectId(),
    price: 50,
    description: 'Test description',
    images: ['image.jpg']
  });
  await product.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Order.deleteMany({});
});

describe('Orders API', () => {
  it('should create a Razorpay order', async () => {
    const res = await request(app)
      .post('/api/orders/create-razorpay-order')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 'order_mock123');
    expect(res.body).toHaveProperty('amount', 5000);
  });

  it('should verify payment and save order', async () => {
    const razorpayOrderId = 'order_mock123';
    const razorpayPaymentId = 'pay_mock123';
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret';

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const razorpaySignature = shasum.digest('hex');

    const orderData = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      items: [{
        product: product._id,
        name: product.name,
        quantity: 1,
        price: product.price
      }],
      totalAmount: 50,
      shippingAddress: {
        fullName: 'Test User',
        address: '123 Street',
        city: 'City',
        postalCode: '00000',
        country: 'Country',
        phone: '1234567890'
      }
    };

    const res = await request(app)
      .post('/api/orders/verify-payment')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('status', 'processing');
    expect(res.body.paymentDetails).toHaveProperty('razorpayOrderId', razorpayOrderId);

    // Verify order is in DB
    const orderInDb = await Order.findById(res.body._id);
    expect(orderInDb).toBeTruthy();
    expect(orderInDb.totalAmount).toEqual(50);
  });

  it('should fail verification with invalid signature', async () => {
    const orderData = {
      razorpayOrderId: 'order_mock123',
      razorpayPaymentId: 'pay_mock123',
      razorpaySignature: 'invalid_signature',
      items: [{
        product: product._id,
        name: product.name,
        quantity: 1,
        price: product.price
      }],
      totalAmount: 50,
      shippingAddress: {
        fullName: 'Test User',
        address: '123 Street',
        city: 'City',
        postalCode: '00000',
        country: 'Country',
        phone: '1234567890'
      }
    };

    const res = await request(app)
      .post('/api/orders/verify-payment')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Transaction not legit!');
  });
});
