const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ordersRoutes = require('./routes/orders');
const paymentsRoutes = require('./routes/payments');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRoutes);
app.use('/api', paymentsRoutes);


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