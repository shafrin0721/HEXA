const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hexa API is running' });
});

// Products route
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Hexa Classic Tee', price: 19.99 },
    { id: 2, name: 'Hexa Premium Hoodie', price: 49.99 }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});