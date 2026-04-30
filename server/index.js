require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const blogRoutes = require('./routes/blogs');
const uploadRoutes = require('./routes/upload');
const orderRoutes = require('./routes/orders');
const feedbackRoutes = require('./routes/feedback');
const pageRoutes = require('./routes/pages');
const settingsRoutes = require('./routes/settings');
const adminRoutes = require('./routes/admin');



const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);



// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 STO Server running on http://localhost:${PORT}`);
    console.log(`📦 API endpoints:`);
    console.log(`   POST   /api/auth/login`);
    console.log(`   POST   /api/auth/register`);
    console.log(`   POST   /api/auth/forgot-password`);
    console.log(`   POST   /api/auth/reset-password`);
    console.log(`   GET    /api/products`);
    console.log(`   POST   /api/products`);
    console.log(`   PUT    /api/products/:id`);
    console.log(`   DELETE /api/products/:id`);
    console.log(`   GET    /api/categories`);
    console.log(`   POST   /api/categories`);
    console.log(`   PUT    /api/categories/:id`);
    console.log(`   DELETE /api/categories/:id`);
    console.log(`   GET    /api/blogs`);
    console.log(`   POST   /api/blogs`);
    console.log(`   PUT    /api/blogs/:id`);
    console.log(`   DELETE /api/blogs/:id`);
    console.log(`   POST   /api/upload`);
    console.log(`   GET    /api/admin/stats`);
    console.log(`   GET    /api/admin/settings`);
    console.log(`   GET    /api/settings/public`);
  });
}

module.exports = app;
