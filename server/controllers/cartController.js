const pool = require('../config/db');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const [cartItems] = await pool.query(
            `SELECT ci.id, ci.productId, ci.quantity, p.name, p.price, p.image
             FROM cartItems ci
             JOIN products p ON ci.productId = p.id
             WHERE ci.userId = ?`,
            [userId]
        );

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.json({
            message: 'Cart retrieved',
            data: {
                items: cartItems,
                total: total,
                itemCount: cartItems.length
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!productId || quantity < 1) {
            return res.status(400).json({ message: 'Invalid product or quantity' });
        }

        // Check if product exists
        const [product] = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if item already in cart
        const [existingItem] = await pool.query(
            'SELECT id, quantity FROM cartItems WHERE userId = ? AND productId = ?',
            [userId, productId]
        );

        if (existingItem.length > 0) {
            // Update quantity
            await pool.query(
                'UPDATE cartItems SET quantity = quantity + ? WHERE id = ?',
                [quantity, existingItem[0].id]
            );
        } else {
            // Add new item
            await pool.query(
                'INSERT INTO cartItems (userId, productId, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
        }

        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        // Verify cart item belongs to user
        const [cartItem] = await pool.query(
            'SELECT id FROM cartItems WHERE id = ? AND userId = ?',
            [itemId, userId]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await pool.query(
            'UPDATE cartItems SET quantity = ? WHERE id = ?',
            [quantity, itemId]
        );

        res.json({ message: 'Cart item updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.params;

        // Verify cart item belongs to user
        const [cartItem] = await pool.query(
            'SELECT id FROM cartItems WHERE id = ? AND userId = ?',
            [itemId, userId]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await pool.query('DELETE FROM cartItems WHERE id = ?', [itemId]);

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await pool.query('DELETE FROM cartItems WHERE userId = ?', [userId]);

        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};
