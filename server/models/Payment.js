const db = require('../config/database');

class Payment {
  // Create payment record
  static async create(paymentData) {
    const { 
      order_id, 
      amount, 
      payment_method, 
      card_last_four, 
      status,
      transaction_id,
      card_type 
    } = paymentData;
    
    // DEBUG - Log what we're inserting
    console.log('\n=== PAYMENT CREATE DEBUG ===');
    console.log('card_last_four:', card_last_four, 'Type:', typeof card_last_four);
    console.log('card_type:', card_type, 'Type:', typeof card_type);
    console.log('transaction_id:', transaction_id, 'Type:', typeof transaction_id);
    console.log('amount:', amount);
    console.log('============================\n');
    
    const [result] = await db.query(
      `INSERT INTO payments (order_id, amount, payment_method, card_last_four, status, transaction_id, card_type, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [order_id, amount, payment_method, card_last_four, status, transaction_id, card_type]
    );
    
    console.log('✅ Payment inserted, ID:', result.insertId);
    
    // Verify the insert by reading it back
    const [inserted] = await db.query(
      `SELECT * FROM payments WHERE id = ?`,
      [result.insertId]
    );
    console.log('Verified inserted payment:', inserted[0]);
    console.log('============================\n');
    
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

  // Update transaction ID
  static async updateTransactionId(paymentId, transactionId) {
    const [result] = await db.query(
      `UPDATE payments SET transaction_id = ? WHERE id = ?`,
      [transactionId, paymentId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Payment;