const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Payment = require('../models/Payment');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, shipping_address, payment_info } = req.body;
    const user_id = req.user?.id || 1; // Get from auth middleware

    // Start transaction
    const connection = await require('../config/database').getConnection();
    await connection.beginTransaction();

    try {
      // Create payment record
      const paymentId = await Payment.create({
        order_id: null, // Will update after order creation
        amount: total,
        payment_method: 'credit_card',
        card_last_four: payment_info.cardNumber.slice(-4),
        status: 'completed'
      });

      // Create order
      const orderId = await Order.create({
        user_id,
        total,
        status: 'pending',
        shipping_address,
        payment_id: paymentId
      });

      // Update payment with order_id
      await connection.query(
        `UPDATE payments SET order_id = ? WHERE id = ?`,
        [orderId, paymentId]
      );

      // Create order items
      await OrderItem.create(orderId, items);

      // Commit transaction
      await connection.commit();

      // Get complete order details
      const order = await Order.findById(orderId);
      const orderItems = await OrderItem.findByOrderId(orderId);
      const payment = await Payment.findById(paymentId);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          order,
          items: orderItems,
          payment
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

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const orders = await Order.findByUserId(userId);
    
    // Get items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.findByOrderId(order.id);
        return { ...order, items };
      })
    );

    res.json({
      success: true,
      data: ordersWithItems
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const items = await OrderItem.findByOrderId(id);
    const payment = await Payment.findByOrderId(id);

    res.json({
      success: true,
      data: {
        ...order,
        items,
        payment
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.updateStatus(id, status);
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
};