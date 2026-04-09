const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ordersRoutes = require('./routes/orders');
const paymentsRoutes = require('./routes/payments');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - IMPORTANT: Order matters
app.use('/api/orders', ordersRoutes);
app.use('/api', paymentsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});