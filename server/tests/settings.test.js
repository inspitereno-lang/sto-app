const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let user;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  // Create a regular user
  user = new User({ 
    username: 'settinguser', 
    email: 'settings@example.com', 
    password: 'oldpassword123', 
    role: 'user' 
  });
  await user.save();
  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Settings API', () => {
  
  describe('POST /api/settings/change-password', () => {
    it('should change password successfully with correct current password', async () => {
      const res = await request(app)
        .post('/api/settings/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'oldpassword123',
          newPassword: 'newpassword456'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Password updated successfully.');

      // Verify login with new password
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'settings@example.com',
          password: 'newpassword456'
        });
      expect(loginRes.statusCode).toEqual(200);
    });

    it('should fail if current password is incorrect', async () => {
      const res = await request(app)
        .post('/api/settings/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'anotherpassword'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Incorrect current password.');
    });

    it('should fail if current or new password is missing', async () => {
      const res = await request(app)
        .post('/api/settings/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'oldpassword123'
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should fail if unauthorized', async () => {
      const res = await request(app)
        .post('/api/settings/change-password')
        .send({
          currentPassword: 'oldpassword123',
          newPassword: 'newpassword456'
        });

      expect(res.statusCode).toEqual(401);
    });
  });
});
