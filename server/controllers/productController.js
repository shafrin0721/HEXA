const Product = require('../models/Product');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.getAllProducts(limit, offset),
    Product.getTotalProducts()
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasPrev: page > 1,
      hasNext: page * limit < total
    }
  });
});

exports.searchProducts = catchAsyncError(async (req, res, next) => {
  const { search, category_id } = req.query;
  
  if (!search) {
    return res.status(400).json({
      success: false,
      message: 'Search term required'
    });
  }

  const products = await Product.searchProducts(search, category_id || null);

  res.status(200).json({
    success: true,
    products,
    count: products.length
  });
});

