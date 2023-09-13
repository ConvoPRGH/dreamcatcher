const psql = require('./psql_config');
const {v4 : uuidv4} = require('uuid')

const getAllBins = async () => {
  const text = `SELECT b.*, count(r.id) AS requests 
                FROM bins b
                LEFT JOIN requests r ON b.id = r.bin_id
                GROUP BY b.id`;
                
  try {
    const response = await psql.query(text);
    return response;
  } catch(e) {
    console.log('DB error', e.message);
  }
};

const getOneBin = async (bin_path) => {
  const text = `SELECT * FROM bins
                WHERE bins.bin_path = $1`;
  try {
    const response = await psql.query(text, [bin_path]);
    return response
  } catch(e) {
    console.log('DB error', e.message);
  }
};

const getAllRequests = async (bin_id) => {
  const text = `SELECT * FROM requests(r)
                JOIN bins(b) ON b.id = r.bin_id
                WHERE b.id = $1`;
  try {
    const response = await psql.query(text, [bin_id]);
    return response;
  } catch(e) {
    console.log('DB error', e.message);
  }
};

const createNewBin = async (name) => {
  const text = `INSERT INTO bins (name, created_at, bin_path)
                VALUES ($1, now(), $2)`;
  const uuid = uuidv4();
  try {
    const response = await psql.query(text, [name, uuid]);
    return response;
  } catch(e) {
    console.log('DB error', e.message);
  }
}

module.exports = {
  getAllBins,
  getOneBin,
  getAllRequests,
  createNewBin
};