exports.createOrder = async (req, res) => {
  try {
    const { 
      items, 
      total, 
      payment_intent_id,
      payment_status,
      shipping_address, 
      payment_info 
    } = req.body;
    
    const user_id = req.user?.id || 1;

    if (!payment_intent_id) {
      throw new Error('payment_intent_id is required');
    }
    
    if (!payment_info || !payment_info.card_last4) {
      throw new Error('payment_info with card_last4 is required');
    }

    const connection = await require('../config/db').getConnection();
    await connection.beginTransaction();

    try {
      const paymentQuery = `
        INSERT INTO payments (order_id, amount, payment_method, card_last_four, status, transaction_id, card_type, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      
      const paymentValues = [
        null, 
        total,
        'credit_card',
        payment_info.card_last4, 
        payment_status || 'completed',
        payment_intent_id, 
        payment_info.card_type || 'unknown'
      ];
      
      const [paymentResult] = await connection.query(paymentQuery, paymentValues);
      const paymentId = paymentResult.insertId;

      // Modified to match your orders table columns
      const orderQuery = `
        INSERT INTO orders (user_id, total, status, created_at) 
        VALUES (?, ?, ?, NOW())
      `;
      
      const orderValues = [
        user_id,
        total,
        'pending'
      ];
      
      const [orderResult] = await connection.query(orderQuery, orderValues);
      const orderId = orderResult.insertId;

      await connection.query(
        `UPDATE payments SET order_id = ? WHERE id = ?`,
        [orderId, paymentId]
      );

      if (items && items.length > 0) {
        for (const item of items) {
          await connection.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price) 
             VALUES (?, ?, ?, ?)`,
            [orderId, item.id, item.quantity, item.price]
          );
        }
      }

      await connection.commit();

      const [verifyPayment] = await connection.query(
        `SELECT * FROM payments WHERE id = ?`,
        [paymentId]
      );
      
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          order: { id: orderId, total: total, status: 'pending' },
          payment: verifyPayment[0]
        }
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};