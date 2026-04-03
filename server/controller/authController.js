import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body; 

    try {
        const [userExists] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // අලුතින් Register වන සියලු දෙනා 'customer' ලෙස ඇතුළත් වේ
        await db.execute(
            'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'customer'] 
        );

        res.status(201).json({ success: true, message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // JWT Token එක ඇතුළට 'role' එකත් එකතු කරන්න
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.full_name}`,
            token,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                role: user.role // Frontend එකට අඳුරගන්න role එකත් යවන්න
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};