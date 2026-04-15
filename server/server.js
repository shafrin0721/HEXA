import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../client/dist');
const hasClientBuild = fs.existsSync(clientDistPath);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));
}

app.get('/', (_req, res) => {
  if (hasClientBuild) {
    return res.sendFile(path.join(clientDistPath, 'index.html'));
  }

  return res.json({
    status: 'ok',
    message: 'Hexa backend is running. Use /api/products for products or run the frontend dev server for the React app.'
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Hexa API is running' });
});

if (hasClientBuild) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

const seedMissingProducts = async () => {
  const missingProducts = [
    { id: 1, name: 'Veritas Strength Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-1.jpg', stock: 50 },
    { id: 2, name: 'Chorale Noir Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-2.jpg', stock: 50 },
    { id: 3, name: 'Elan Focus Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-3.jpg', stock: 50 },
    { id: 4, name: 'Monogram Grid Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-4.jpg', stock: 50 },
    { id: 5, name: 'Racecraft Signature Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t5.jpg', stock: 50 },
    { id: 6, name: 'Architecte Blueprint Hoodie', description: 'Premium hoodie with detailed blueprint design.', price: 19.99, image: '/assets/t-6.jpg', stock: 50 },
    { id: 7, name: 'Minimalis Air Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-7.jpg', stock: 50 },
    { id: 8, name: 'Broadcast Noir Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-8.jpg', stock: 50 },
    { id: 9, name: 'Justitia Statement Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-9.jpg', stock: 50 },
    { id: 10, name: 'Divinus Path Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-10.jpg', stock: 50 },
    { id: 11, name: 'Urban Luxe Code Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-7.jpg', stock: 50 },
    { id: 12, name: 'Divine Script Tee', description: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: 19.99, image: '/assets/t-12.jpg', stock: 50 }
  ];

  try {
    const [rows] = await pool.query('SELECT id FROM products WHERE id BETWEEN 1 AND 12');
    const existingIds = new Set(rows.map(row => row.id));
    const toInsert = missingProducts.filter(p => !existingIds.has(p.id));

    if (!toInsert.length) {
      console.log('No missing products to seed.');
      return;
    }

    const values = toInsert.map(p => [p.id, null, p.name, p.description, p.price, p.image, p.stock]);
    await pool.query(
      'INSERT INTO products (id, category_id, name, description, price, image, stock) VALUES ?',
      [values]
    );
    console.log(`Inserted ${toInsert.length} missing product(s) into the database.`);
  } catch (error) {
    console.error('Failed to seed missing products:', error.message);
  }
};

seedMissingProducts().catch((error) => {
  console.error('Error seeding products on startup:', error);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
