const db = require('../config/database');

class Product {
  static async getAllProducts(limit = 50, offset = 0) {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ORDER BY p.id DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async getTotalProducts() {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM products');
    return rows[0]?.count || 0;
  }

  static async searchProducts(search, category_id = null) {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.name LIKE ? OR p.description LIKE ?
    `;
    let params = [`%${search}%`, `%${search}%`];

    if (category_id) {
      query += ' AND p.category_id = ?';
      params.push(category_id);
    }

    query += ' ORDER BY p.id DESC';

    const [rows] = await db.query(query, params);
    return rows;
  }
}

module.exports = Product;

