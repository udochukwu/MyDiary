import 'dotenv/config';

import { Pool } from 'pg';


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};
