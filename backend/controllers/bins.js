const binsRouter = require('express').Router();
const { getAllBins, getAllRequests, getOneBin, createNewBin, getAllPayloads, deleteBin } = require('../modules/psql_bins.js');
const { deleteRequest } = require('../modules/requests.js');

binsRouter.get('/', async (req, res) => {
  try {
    const data = await getAllBins();
    res.status(200).json(data.rows);
  } catch(e) {
    console.log('Error returning SQL', e.message);
  }
});

binsRouter.get('/:bin_path/requests', async (req, res) => {
  const binPath = req.params.bin_path;
  try {
    const requests = await getAllRequests(binPath);
    const mongoIds = requests.rows.map(obj => obj.mongo_id);
    const payloads = await getAllPayloads(mongoIds);

    const payloadMap = new Map();

    for (const payload of payloads) {
      payloadMap.set(payload.request_id, payload.payload);
    }

    const requestsRows = requests.rows
    for (request of requestsRows) {
      const payload = payloadMap.get(request.mongo_id);
      if (payload) {
        request.payload = payload;
      }
    }

    res.status(200).json(requestsRows);
  } catch(e) {
    console.log('Error retrieving requests from SQL', e.message);
  }
});

// delete a request
binsRouter.delete('/:bin_path/requests/:request_id', async (req, res) => {
  const request_id = req.params.request_id;
  try {
    const response = await deleteRequest(request_id);
    res.status(200).json({deleted: 'OK'});
  } catch(e) {
    console.log('error after deleting request', e.message);
  }
});


binsRouter.get('/:bin_path', async (req, res) => {
  
  const binPath = req.params.bin_path;
  try {
    const data = await getOneBin(binPath);
    res.status(200).json(data.rows);
  } catch(e) {
    console.log('Error returning SQL', e.message)
  }
});

// delete a bin
binsRouter.delete('/:bin_path', async (req, res) => {
  const binPath = req.params.bin_path;
  try {
    const data = await deleteBin(binPath);
    res.status(200).json({deleted: true});
  } catch(e) {
    console.log('Error returning SQL', e.message);
  }
});

binsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(req)
  try {
    console.log(req.body)
    const data = await createNewBin(name);
    res.status(201).json(data.rows);
  } catch(e) {
    console.log('Error creating new bin', e.message);
  }
});


module.exports = binsRouter;