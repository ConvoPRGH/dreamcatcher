const endpointsRouter = require('express').Router();
const {insertPayload} = require('../modules/requests.js');
// const { getAllBins, getAllRequests, getOneBin, createNewBin } = require('../modules/psql_bins.js');



// Accepts a request of ANY METHOD to process
/*
What will comprises a document in Mongo (aka "payload")?
 - http headers
 - http body (json)

 ur

 
*/



endpointsRouter.all('/:bin_path', (req, res) => {
  const path = req.path;
  const method = req.method;
  const payload = {headers: req.headers, body: req.body};

  // validate bin_path
  insertPayload(JSON.stringify(payload));

  res.status(200).send(`Thanks for the ${req.method} request`)
})


module.exports = endpointsRouter