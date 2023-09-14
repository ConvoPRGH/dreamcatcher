const endpointsRouter = require('express').Router();
const { insertPayloadToMongo, insertRequestToPSQL } = require('../modules/requests.js');
const { getOneBin } = require('../modules/psql_bins.js');

module.exports = (wss) => {
  endpointsRouter.all('/:bin_path', async (req, res) => {
    const binPath = req.params.bin_path;
    const binData = await getOneBin(binPath);
    if (!binData.rows[0]) {
      console.log("Bin not found");
      res.status(400).send('Bad Request: Bin Path Not Found');
    }
  
    const path = req.get('host');
    const method = req.method;
    const payload = {headers: req.headers, body: req.body};
    let mongoUUID, mongoPayload;
  
    try {
      const mongoData = await insertPayloadToMongo(JSON.stringify(payload), res);
      mongoUUID = mongoData.uuid;
      mongoPayload = mongoData.payload;
    } catch(e) {
      console.log('Error inserting payload to Mongo', e.message);
    }
  
    try {
      const data = await insertRequestToPSQL(binPath, mongoUUID, method, path);
      const requestRow = data.rows[0];
      requestRow.payload = mongoPayload;

      sendNewRequestToClients(wss, requestRow)
      
      res.status(201).json({status: 201, created: 'ok'});
    } catch(e) {
      console.log('Error inserting request to PSQL', e.message);
    }
  })

  const sendNewRequestToClients = (wss, requestRow) => {
    if (wss.clients) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(requestRow));
      });
    }
  }

  return endpointsRouter;
}
