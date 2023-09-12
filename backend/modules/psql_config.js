const config = require('./utils/config');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: config.SQL_USERNAME,
  password: config.SQL_PW,
  host: 'localhost',
  database: config.SQL_DB,
});

module.exports = pool;