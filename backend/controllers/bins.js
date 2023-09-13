const binsRouter = require('express').Router();
const { getAllBins, getAllRequests, getOneBin, createNewBin } = require('../modules/psql_bins.js');

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
    const data = await getAllRequests(binPath);
    res.status(200).json(data.rows);
  } catch(e) {
    console.log('Error retrieving requests from SQL', e.message);
  }
})

binsRouter.get('/:bin_path', async (req, res) => {
  const binPath = req.params.bin_path;
  try {
    const data = await getOneBin(binPath);
    res.status(200).json(data.rows);
  } catch(e) {
    console.log('Error returning SQL', e.message)
  }
})

binsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(req)
  try {
    console.log(req.body)
    const data = await createNewBin(name)
    res.status(201).json(data.rows);
  } catch(e) {
    console.log('Error creating new bin', e.message)
  }
})

module.exports = binsRouter