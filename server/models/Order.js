const db = require('../config/database');

class Order {
  // Create new order
  static async create(orderData) {
    const { 
      user_id, 
      total, 
      subtotal,
      shipping_cost,
      status, 
      shipping_address, 
      payment_id,
      payment_intent_id 
    } = orderData;
    
    const [result] = await db.query(
      `INSERT INTO orders (user_id, total, subtotal, shipping_cost, status, shipping_address, payment_id, payment_intent_id, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [user_id, total, subtotal || total, shipping_cost || 0, status, JSON.stringify(shipping_address), payment_id, payment_intent_id]
    );
    return result.insertId;
  }

  // Get order by ID
  static async findById(orderId) {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE id = ?`,
      [orderId]
    );
    if (rows[0] && rows[0].shipping_address) {
      rows[0].shipping_address = JSON.parse(rows[0].shipping_address);
    }
    return rows[0];
  }

  // Get orders by user ID
  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    rows.forEach(row => {
      if (row.shipping_address) {
        row.shipping_address = JSON.parse(row.shipping_address);
      }
    });
    return rows;
  }

  // Update order status
  static async updateStatus(orderId, status) {
    const [result] = await db.query(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, orderId]
    );
    return result.affectedRows > 0;
  }

  // Get all orders (admin)
  static async getAll() {
    const [rows] = await db.query(
      `SELECT o.*, u.name as user_name, u.email as user_email 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`
    );
    rows.forEach(row => {
      if (row.shipping_address) {
        row.shipping_address = JSON.parse(row.shipping_address);
      }
    });
    return rows;
  }
}

module.exports = Order;