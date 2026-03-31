const db = require('../config/database');

class Payment {
  // Create payment record
  static async create(paymentData) {
    const { order_id, amount, payment_method, card_last_four, status } = paymentData;
    const [result] = await db.query(
      `INSERT INTO payments (order_id, amount, payment_method, card_last_four, status, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [order_id, amount, payment_method, card_last_four, status]
    );
    return result.insertId;
  }

  // Get payment by ID
  static async findById(paymentId) {
    const [rows] = await db.query(
      `SELECT * FROM payments WHERE id = ?`,
      [paymentId]
    );
    return rows[0];
  }

  // Get payment by order ID
  static async findByOrderId(orderId) {
    const [rows] = await db.query(
      `SELECT * FROM payments WHERE order_id = ?`,
      [orderId]
    );
    return rows[0];
  }

  // Update payment status
  static async updateStatus(paymentId, status) {
    const [result] = await db.query(
      `UPDATE payments SET status = ? WHERE id = ?`,
      [status, paymentId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Payment;