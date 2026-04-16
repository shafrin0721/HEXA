// productController.js
const pool = require('../config/db');

const getAllProducts = async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.category_id,
        p.name,
        p.description,
        p.price,
        p.image,
        p.stock,
        c.name AS category,
        COALESCE(AVG(r.rating), 0) AS avg_rating,
        COUNT(r.id) AS review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON p.id = r.product_id
      GROUP BY p.id, p.category_id, p.name, p.description, p.price, p.image, p.stock, c.name
      ORDER BY p.id
    `);

    const [variantRows] = await pool.query(`
      SELECT product_id, size, color, stock
      FROM product_variants
      ORDER BY product_id
    `);

    const variantsByProduct = variantRows.reduce((acc, variant) => {
      if (!acc[variant.product_id]) acc[variant.product_id] = [];
      acc[variant.product_id].push({
        size: variant.size,
        color: variant.color,
        stock: variant.stock
      });
      return acc;
    }, {});

    const products = rows.map(product => ({
      ...product,
      variants: variantsByProduct[product.id] || [],
      avg_rating: parseFloat(product.avg_rating).toFixed(1)
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

module.exports = { getAllProducts, getProductById };