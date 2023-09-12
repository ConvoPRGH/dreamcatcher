const mongoose = require('mongoose');

// creates db schema
const payloadSchema = new mongoose.Schema({
  payload: string,
});

payloadSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    //delete returnedObject.__v
  }
});

// creates something called a Payload with the schema
module.exports = mongoose.model('Payload', payloadSchema)