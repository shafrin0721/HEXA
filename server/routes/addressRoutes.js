// backend/routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth'); // You need to create this

// Save address and create order - Add auth middleware
router.post('/address', authMiddleware, async (req, res) => {
  try {
    const { 
      email, firstName, lastName, address, city, 
      state, zipCode, phone, cart, subtotal, shipping, total 
    } = req.body;
    
    // Get user ID from the authenticated user (set by middleware)
    const userId = req.user.id; // Changed from req.user?.id
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    // Start transaction
    await db.query('START TRANSACTION');
    
    // 1. Insert or update address in addresses table
    const [addressResult] = await db.query(
      `INSERT INTO addresses (user_id, first_name, last_name, email, address_line_1, city, postal_code, country, phone) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       first_name = VALUES(first_name), 
       last_name = VALUES(last_name),
       email = VALUES(email),
       address_line_1 = VALUES(address_line_1), 
       city = VALUES(city), 
       postal_code = VALUES(postal_code), 
       country = VALUES(country), 
       phone = VALUES(phone)`,
      [userId, firstName, lastName, email, address, city, zipCode, state || 'USA', phone]
    );
    
    const addressId = addressResult.insertId || await getAddressId(userId);
    
    // 2. Create order
    const [orderResult] = await db.query(
      `INSERT INTO orders (user_id, address_id, total, status, shipping_cost, created_at) 
       VALUES (?, ?, ?, 'pending', ?, NOW())`,
      [userId, addressId, total, shipping]
    );
    
    const orderId = orderResult.insertId;
    
    // 3. Insert order items
    for (const item of cart) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }
    
    // 4. Clear user's cart
    await db.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);
    
    // Commit transaction
    await db.query('COMMIT');
    
    res.json({
      success: true,
      orderId: orderId,
      addressId: addressId,
      message: 'Address saved and order created successfully'
    });
    
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error saving address:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving address information: ' + error.message
    });
  }
});

// Helper function to get address ID
async function getAddressId(userId) {
  const [result] = await db.query(
    'SELECT id FROM addresses WHERE user_id = ? LIMIT 1',
    [userId]
  );
  return result[0]?.id || null;
}

// Get user's address if exists - Add auth middleware
router.get('/address/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the user is requesting their own address
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const [address] = await db.query(
      `SELECT 
        first_name as firstName, 
        last_name as lastName, 
        email,
        address_line_1 as address, 
        city, 
        postal_code as zipCode, 
        country as state, 
        phone 
       FROM addresses 
       WHERE user_id = ?`,
      [userId]
    );
    
    res.json({
      success: true,
      data: address[0] || null
    });
    
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching address'
    });
  }
});

// Update existing address - Add auth middleware
router.put('/address/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the user is updating their own address
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const { firstName, lastName, address, city, zipCode, state, phone, email } = req.body;
    
    const [result] = await db.query(
      `UPDATE addresses 
       SET first_name = ?, last_name = ?, email = ?, address_line_1 = ?, 
           city = ?, postal_code = ?, country = ?, phone = ?
       WHERE user_id = ?`,
      [firstName, lastName, email, address, city, zipCode, state || 'USA', phone, userId]
    );
    
    if (result.affectedRows === 0) {
      // If no address exists, insert new one
      await db.query(
        `INSERT INTO addresses (user_id, first_name, last_name, email, address_line_1, city, postal_code, country, phone) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, email, address, city, zipCode, state || 'USA', phone]
      );
    }
    
    res.json({
      success: true,
      message: 'Address updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating address'
    });
  }
});

module.exports = router;