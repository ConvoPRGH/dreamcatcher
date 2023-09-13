const Payload = require('./payload.js');
const {v4 : uuidv4} = require('uuid');
const psql = require('./psql_config');


const insertPayloadToMongo = async (payload) => {
  const uuid = uuidv4();
  const newPayload = new Payload({payload: payload, request_id: uuid});

  try {
    await newPayload.save();
    return uuid;
  } catch (error) {
    console.log('Error inserting Payload into Mongo', e);
  }
};

const insertRequestToPSQL = async (binPath, mongoUUID, method, path) => {
  const text = `INSERT INTO requests (bin_path, mongo_id, received_at, http_method, http_path)
                VALUES ($1, $2, now(), $3, $4)`
  try {
    const response = await psql.query(text, [binPath, mongoUUID, method, path]);
    return response;
  } catch(e) {
    console.log('Error inserting Request into PSQL', e.message);
  }
}

module.exports = { insertPayloadToMongo, insertRequestToPSQL };