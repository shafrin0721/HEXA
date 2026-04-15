const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Get products by category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Create product (Admin only)
router.post('/', auth, productController.createProduct);

// Update product (Admin only)
router.put('/:id', auth, productController.updateProduct);

// Delete product (Admin only)
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;