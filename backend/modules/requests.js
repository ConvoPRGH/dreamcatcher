const Payload = require('./payload.js');
const {v4 : uuidv4} = require('uuid')


const insertPayload = async (payload) => {
  const uuid = uuidv4();
  const newPayload = new Payload({payload: payload, request_id: uuid});

  try {
    const mongoDoc = await newPayload.save();
    return uuid
  } catch (error) {
    console.log('Error inserting into Mongo', e);
  }
};

module.exports = {insertPayload};