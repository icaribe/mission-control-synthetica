const { Pool } = require('pg');

// Use DATABASE_URL env var (Railway provides it)
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: async () => await pool.connect(),
};
