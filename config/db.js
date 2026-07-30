const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test connection immediately on start
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database Connection Error ❌:', err.message);
  } else {
    console.log('Connected to PostgreSQL Database! 🚀');
  }
});

module.exports = pool;