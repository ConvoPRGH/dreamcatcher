const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const binsRouter = require('./controllers/bins.js')
const path = require('path');

// TODO
// const requestsRouter = require('./controllers/requests.js')

const app = express();
app.use(cors());
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/bins/', binsRouter)

console.log(`connecting to ${config.MONGODB_URI}`);
(async () => {
  try {
    const response = await mongoose.connect(config.MONGODB_URI);
    console.log('connected to mongoDB');
  } catch (e) {
    console.log('error connecting to mongoDB');
  }
})();

// app.use(express.static(''))

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(filePath)
});

app.post('/bins/:bin_path', (req, res) => {
  const binPath = req.params.bin_path;
  console.log(`Got a request to ${binPath}`);
  console.log(req.method);
  console.log(req.path);
  console.log(req.body);
  res.status(201).send('POST request successful')
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app;