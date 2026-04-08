const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Get all orders (Protected route - Admins only)
router.get('/', auth, orderController.getAllOrders);

// Get user's orders (Protected route)
router.get('/user', auth, orderController.getUserOrders);

// Get single order by ID
router.get('/:id', auth, orderController.getOrderById);

// Create new order (Protected route)
router.post('/', auth, orderController.createOrder);

// Update order status (Protected route - Admins only)
router.put('/:id', auth, orderController.updateOrderStatus);

// Delete order (Protected route - Admins only)
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
