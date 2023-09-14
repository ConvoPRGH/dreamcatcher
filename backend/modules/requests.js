const Payload = require('./payload.js');
const {v4 : uuidv4} = require('uuid');
const psql = require('./psql_config');


const insertPayloadToMongo = async (payload) => {
  const uuid = uuidv4();
  const newPayload = new Payload({payload: payload, request_id: uuid});

  try {
    const mongoPayload = await newPayload.save();
    mongoPayload.uuid = uuid;
    return mongoPayload;
  } catch (error) {
    console.log('Error inserting Payload into Mongo', e);
  }
};

const insertRequestToPSQL = async (binPath, mongoUUID, method, path) => {
  const text = `INSERT INTO requests (bin_path, mongo_id, received_at, http_method, http_path)
                VALUES ($1, $2, now(), $3, $4)
                RETURNING *`
  try {
    const response = await psql.query(text, [binPath, mongoUUID, method, path]);
    return response;
  } catch(e) {
    console.log('Error inserting Request into PSQL', e.message);
  }
};

const deleteRequest = async (mongoUUID) => {
  const text = `DELETE FROM requests
                WHERE mongo_id = $1`;
  try {
    // TODO need to error handle these and return a proper response
    const response = await psql.query(text, [mongoUUID]);
    const mongo_res = await Payload.deleteOne({reequest_id: mongoUUID});
    return response;
  } catch(e) {
    console.log('Error deleting bin', e.message)
  }
}


module.exports = { insertPayloadToMongo, insertRequestToPSQL, deleteRequest };