const endpointsRouter = require('express').Router();
// const { getAllBins, getAllRequests, getOneBin, createNewBin } = require('../modules/psql_bins.js');

// Accepts a request of ANY METHOD to process
endpointsRouter.all('/:bin_path', (req, res) => {
  const binPath = req.params.bin_path;
  console.log(`Got a request to ${binPath}`);
  console.log(`Method: ${req.method}`);
  console.log(req.path);
  console.log(req.body);
  res.status(200).send(`Thanks for the ${req.method} request`)
})


module.exports = endpointsRouter