import pool from '../config/db.js';

export const getCartItems = async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.id, c.quantity, p.name, p.price, p.image, c.variant
      FROM cart_items c
      INNER JOIN products p ON p.id = c.product_id
      ORDER BY c.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
  }
};
