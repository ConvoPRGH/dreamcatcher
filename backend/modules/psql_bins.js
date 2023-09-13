const psql = require('./psql_config');
const {v4 : uuidv4} = require('uuid')
const Payload = require('./payload.js');

const getAllBins = async () => {
  const text = `SELECT b.*, count(r.id) AS requests 
                FROM bins b
                LEFT JOIN requests r ON b.bin_path = r.bin_path
                GROUP BY b.id`;
                
  try {
    const response = await psql.query(text);
    return response;
  } catch(e) {
    console.log('Error retrieving bins', e.message);
  }
};

const getOneBin = async (bin_path) => {
  const text = `SELECT * FROM bins
                WHERE bins.bin_path = $1`;
  try {
    const response = await psql.query(text, [bin_path]);
    return response
  } catch(e) {
    console.log('Error retrieving bin', e.message);
  }
};

const getAllRequests = async (bin_path) => {
  const text = `SELECT * FROM requests
                WHERE bin_path = $1`;
  try {
    const response = await psql.query(text, [bin_path]);
    return response;
  } catch(e) {
    console.log('Error retrieving requests', e.message);
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
    console.log('Error creating bin', e.message);
  }
}

const getAllPayloads = async (mongoIds) => {
  try {
    const payloads = Payload.find({ request_id: { $in: mongoIds }});
    return payloads;
  } catch(e) {
    console.log("Error retrieving payloads from Mongo", e.message);
  }
}

module.exports = {
  getAllBins,
  getOneBin,
  getAllRequests,
  createNewBin,
  getAllPayloads
};