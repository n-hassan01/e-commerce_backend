/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-unresolved
const { Pool } = require('pg');

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: dbName,
  password: dbPassword,
  port: 5432,
});

module.exports = pool;
