'use strict';

require('dotenv/config');

var _pg = require('pg');

var pool = new _pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

module.exports = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};