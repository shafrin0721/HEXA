const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword } = require('../utils/validators');

// Register new user
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters with uppercase, lowercase, and number' });
        }

        // Check if user already exists
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await pool.query(
            'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
            [email.toLowerCase(), hashedPassword, firstName, lastName]
        );

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertId, email: email.toLowerCase(), role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertId,
                email: email.toLowerCase(),
                firstName,
                lastName,
                role: 'user'
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Logout user (client-side token removal mainly, can be expanded for blacklist)
exports.logout = async (req, res) => {
    try {
        // Token blacklist logic can be added here
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

// Refresh token
exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            // Generate new token
            const newToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE || '7d' }
            );

            res.json({ message: 'Token refreshed', token: newToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
};
