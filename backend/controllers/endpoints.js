const endpointsRouter = require('express').Router();
const { insertPayloadToMongo, insertRequestToPSQL } = require('../modules/requests.js');
const { getOneBin } = require('../modules/psql_bins.js');

endpointsRouter.all('/:bin_path', async (req, res) => {
  const binPath = req.params.bin_path;
  const binData = await getOneBin(binPath);
  if (!binData.rows[0]) {
    console.log("Bin not found");
    res.status(400).send('Bad Request: Bin Path Not Found');
  }

  const path = req.path;
  const method = req.method;
  const payload = {headers: req.headers, body: req.body};
  let mongoUUID;

  try {
    mongoUUID = await insertPayloadToMongo(JSON.stringify(payload), res);
  } catch(e) {
    console.log('Error inserting payload to Mongo', e.message);
  }

  try {
    const data = await insertRequestToPSQL(binPath, mongoUUID, method, path);
    res.status(201).json(data.rows);
  } catch(e) {
    console.log('Error inserting request to PSQL', e.message);
  }
})

module.exports = endpointsRouter