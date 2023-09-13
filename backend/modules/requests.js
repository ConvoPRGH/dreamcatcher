const mongoose = require('mongoose');
const Payload  = require('./payload.js');


const insertPayload = async (payload) => {
  const newPayload = new Payload({payload});

  try {
    const mongoDoc = await newPayload.save();
    console.log(mongoDoc)
    res.status(200).json(mongoDoc);
  } catch (error) {
    res.status(400).json({message: error.message});
  }

};

module.exports = {insertPayload};