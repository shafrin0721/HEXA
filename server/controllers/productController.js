const pool = require('../config/db');
const { validatePrice } = require('../utils/validators');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 12, sortBy = 'createdAt', order = 'DESC' } = req.query;
        const offset = (page - 1) * limit;

        const [products] = await pool.query(
            `SELECT * FROM products ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`,
            [parseInt(limit), offset]
        );

        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM products');

        res.json({
            message: 'Products retrieved successfully',
            data: products,
            pagination: {
                total: countResult[0].total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(countResult[0].total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get reviews for the product
        const [reviews] = await pool.query('SELECT * FROM reviews WHERE productId = ?', [id]);

        res.json({
            message: 'Product retrieved',
            data: {
                ...product[0],
                reviews
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const [products] = await pool.query('SELECT * FROM products WHERE categoryId = ?', [categoryId]);

        res.json({
            message: 'Products retrieved by category',
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error: error.message });
    }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create products' });
        }

        const { name, description, price, stock, categoryId, image } = req.body;

        // Validation
        if (!name || !description || !price || !categoryId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!validatePrice(price)) {
            return res.status(400).json({ message: 'Invalid price' });
        }

        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock, categoryId, image) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, stock || 0, categoryId, image]
        );

        res.status(201).json({
            message: 'Product created successfully',
            data: { id: result.insertId }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can update products' });
        }

        const { id } = req.params;
        const { name, description, price, stock, image } = req.body;

        if (!name && !description && !price && stock === undefined && !image) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        let query = 'UPDATE products SET ';
        const params = [];

        if (name) {
            query += 'name = ?, ';
            params.push(name);
        }
        if (description) {
            query += 'description = ?, ';
            params.push(description);
        }
        if (price !== undefined) {
            query += 'price = ?, ';
            params.push(price);
        }
        if (stock !== undefined) {
            query += 'stock = ?, ';
            params.push(stock);
        }
        if (image) {
            query += 'image = ?, ';
            params.push(image);
        }

        // Remove trailing comma and add WHERE clause
        query = query.slice(0, -2) + ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can delete products' });
        }

        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = ?', [id]);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
