const { Pool } = require('pg');
require('dotenv').config();

// Create a PostgreSQL pool instance
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  ssl: process.env.PG_SSL === 'true' // Optional: needed for services like Render, Supabase, etc.
});

// Check connection
const startConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release(); // Return client to the pool
  } catch (err) {
    console.error('PostgreSQL connection error:', err.stack);
  }
};

module.exports = { pool, startConnection };
