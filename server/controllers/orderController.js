// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      items, 
      total, 
      subtotal,
      shipping,
      payment_intent_id,
      payment_status,
      shipping_address, 
      payment_info 
    } = req.body;
    
    const user_id = req.user?.id || 1;

    console.log('\n=== CREATE ORDER DEBUG ===');
    console.log('payment_intent_id:', payment_intent_id);
    console.log('payment_info:', payment_info);
    console.log('card_last4 from payment_info:', payment_info?.card_last4);
    console.log('card_type from payment_info:', payment_info?.card_type);
    console.log('========================\n');

    // Validate required data
    if (!payment_intent_id) {
      throw new Error('payment_intent_id is required');
    }
    
    if (!payment_info || !payment_info.card_last4) {
      throw new Error('payment_info with card_last4 is required');
    }

    // Start transaction
    const connection = await require('../config/database').getConnection();
    await connection.beginTransaction();

    try {
      // Create payment record with EXPLICIT values
      const paymentQuery = `
        INSERT INTO payments (order_id, amount, payment_method, card_last_four, status, transaction_id, card_type, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      
      const paymentValues = [
        null,  // order_id (will update later)
        total,
        'credit_card',
        payment_info.card_last4,  // Use the actual card last 4 digits
        payment_status || 'completed',
        payment_intent_id,  // Use Stripe payment intent ID
        payment_info.card_type || 'unknown'  // Use actual card type
      ];
      
      console.log('Inserting payment with values:', paymentValues);
      
      const [paymentResult] = await connection.query(paymentQuery, paymentValues);
      const paymentId = paymentResult.insertId;

      // Create order
      const orderQuery = `
        INSERT INTO orders (user_id, total, subtotal, shipping_cost, status, shipping_address, payment_id, payment_intent_id, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      
      const orderValues = [
        user_id,
        total,
        subtotal || total - (shipping || 0),
        shipping || 0,
        'pending',
        JSON.stringify(shipping_address),
        paymentId,
        payment_intent_id
      ];
      
      const [orderResult] = await connection.query(orderQuery, orderValues);
      const orderId = orderResult.insertId;

      // Update payment with order_id
      await connection.query(
        `UPDATE payments SET order_id = ? WHERE id = ?`,
        [orderId, paymentId]
      );

      // Create order items
      if (items && items.length > 0) {
        for (const item of items) {
          await connection.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price) 
             VALUES (?, ?, ?, ?)`,
            [orderId, item.id, item.quantity, item.price]
          );
        }
      }

      // Commit transaction
      await connection.commit();

      // Verify the inserted payment
      const [verifyPayment] = await connection.query(
        `SELECT * FROM payments WHERE id = ?`,
        [paymentId]
      );
      
      console.log('\n=== VERIFICATION ===');
      console.log('Payment record saved:', verifyPayment[0]);
      console.log('===================\n');

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