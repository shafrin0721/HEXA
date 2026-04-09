import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hexa_db',
});

db.getConnection()
    .then(() => console.log('✅ Database Connected!'))
    .catch((err) => console.log('❌ DB Connection Error:', err));

export default db;