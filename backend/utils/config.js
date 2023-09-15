require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SQL_USERNAME = process.env.SQL_USERNAME;
const SQL_PW = process.env.SQL_PW;
const SQL_DB = process.env.SQL_DB;
const PROD_URL = process.env.PROD_URL;

module.exports = {
  PORT,
  MONGODB_URI,
  SQL_USERNAME,
  SQL_PW,
  SQL_DB,
  PROD_URL
};

