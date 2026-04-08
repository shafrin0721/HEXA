const pool = require('../config/db');

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY createdAt DESC');
        res.json({ message: 'Orders retrieved', data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const [orders] = await pool.query('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC', [userId]);
        res.json({ message: 'User orders retrieved', data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error: error.message });
    }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const [order] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Get order items
        const [items] = await pool.query('SELECT * FROM orderItems WHERE orderId = ?', [id]);
        order[0].items = items;

        res.json({ message: 'Order retrieved', data: order[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { totalAmount, shippingAddress, paymentMethod, items } = req.body;

        // Validate input
        if (!totalAmount || !shippingAddress || !items || items.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create order
        const [result] = await pool.query('INSERT INTO orders (userId, totalAmount, shippingAddress, paymentMethod) VALUES (?, ?, ?, ?)', 
            [userId, totalAmount, shippingAddress, paymentMethod]);

        const orderId = result.insertId;

        // Add order items
        for (const item of items) {
            await pool.query('INSERT INTO orderItems (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price]);
        }

        res.status(201).json({ message: 'Order created successfully', data: { orderId } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        if (!status && !paymentStatus) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        let query = 'UPDATE orders SET ';
        const params = [];

        if (status) {
            query += 'status = ?';
            params.push(status);
        }

        if (paymentStatus) {
            if (status) query += ', ';
            query += 'paymentStatus = ?';
            params.push(paymentStatus);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);
        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
