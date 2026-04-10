const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.post("/", async (req, res) => {
  try {
    const { items, total, shipping_address, payment_info, payment_intent_id } = req.body;
    const user_id = 1; // In production: req.user.id

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Insert payment - matches your payments table
      const [paymentResult] = await connection.query(
        `INSERT INTO payments (amount, payment_method, card_last_four, card_type, status, transaction_id, created_at) 
         VALUES (?, ?, ?, ?, 'completed', ?, NOW())`,
        [total, "credit_card", payment_info.card_last4, payment_info.card_type, payment_intent_id],
      );
      const paymentId = paymentResult.insertId;

      // Insert order - matches your orders table (only has user_id, total, status, created_at)
      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, total, status, created_at) 
         VALUES (?, ?, 'pending', NOW())`,
        [user_id, total]
      );
      const orderId = orderResult.insertId;

      // Update payment with order_id
      await connection.query(
        `UPDATE payments SET order_id = ? WHERE id = ?`,
        [orderId, paymentId]
      );

      // Insert order items - matches your order_items table
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES (?, ?, ?, ?)`,
          [orderId, item.id, item.quantity, item.price],
        );
      }

      await connection.commit();

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: {
          order: {
            id: orderId,
            total: total,
            status: "pending",
            created_at: new Date(),
          },
          payment: {
            id: paymentId,
            amount: total,
            status: "completed",
          },
        },
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

router.get("/totals", async (req, res) => {
  try {
    const user_id = 1; // In production: req.user.id
    
    // Updated to match your cart_items and products tables
    const [cartItems] = await db.query(`
      SELECT 
        ci.product_id,
        ci.quantity,
        p.name,
        p.price,
        p.image
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
    `,
      [],
    );

    if (cartItems.length === 0) {
      return res.json({
        success: true,
        data: {
          items: [],
          subtotal: 0,
          shipping: 0,
          total: 0,
        },
      });
    }

    let subtotal = 0;
    const items = cartItems.map((item) => {
      const itemTotal = item.quantity * parseFloat(item.price);
      subtotal += itemTotal;
      return {
        id: item.product_id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        image: item.image
      };
    });

    const shipping = subtotal > 50 ? 0 : 12.87;
    const total = subtotal + shipping;

    res.json({
      success: true,
      data: {
        items,
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Error fetching order totals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order totals",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.query(`SELECT * FROM orders WHERE id = ?`, [id]);

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    
    // Updated to match your order_items table (no variant_id)
    const [items] = await db.query(`
      SELECT oi.*, p.name, p.image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);
    
    // Get payment info
    const [payment] = await db.query(`
      SELECT * FROM payments WHERE order_id = ?
    `, [id]);
    
    res.json({
      success: true,
      data: {
        order: orders[0],
        items: items,
        payment: payment[0] || null
      }
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

module.exports = router;
