const { Pool } = require('pg');

const pool = new Pool({
  user: 'udochukwu',
  host: '127.0.0.1',
  database: 'MyDiary',
  password: 'player009',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};
