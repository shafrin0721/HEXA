const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/products/search', productController.searchProducts);

module.exports = router;

