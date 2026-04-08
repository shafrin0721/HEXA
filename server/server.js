const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

// Test database connection
const pool = require('./config/db');

pool.getConnection()
    .then(conn => {
        console.log('✓ Database connected successfully');
        conn.release();
    })
    .catch(err => {
        console.error('✗ Database connection failed:', err.message);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════╗
    ║    HEXA Clothing - Server Started             ║
    ║    Port: ${PORT}                                ║
    ║    Environment: ${process.env.NODE_ENV || 'development'}              ║
    ║    API URL: http://localhost:${PORT}/api      ║
    ╚══════════════════════════════════════════════╝
    `);
});