const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL pool instance
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.MYSQL_SSL === 'true' ? {} : undefined // Optional: configure SSL if needed
});

// Check connection
const startConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release(); // Return connection to the pool
  } catch (err) {
    console.error('MySQL connection error:', err.stack);
  }
};

module.exports = { pool, startConnection };
