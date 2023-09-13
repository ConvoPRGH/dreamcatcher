const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// creates db schema
const payloadSchema = new mongoose.Schema({
  payload: String,
});

payloadSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    //delete returnedObject.__v
  }
});

// payloadSchema.plugin(autoIncrement.plugin, {model: 'Payload', field: 'request_id'})
// creates something called a Payload with the schema
module.exports = mongoose.model('Payload', payloadSchema)