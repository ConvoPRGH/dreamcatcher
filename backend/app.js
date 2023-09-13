const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const binsRouter = require('./controllers/bins.js')
const endpointsRouter = require('./controllers/endpoints.js')
const path = require('path');

// TODO
// const requestsRouter = require('./controllers/requests.js')

const app = express();
app.use(express.static(path.join(__dirname, '../frontend/public'), { "extensions": ["js"] }));

console.log(path.join(__dirname, '../frontend/src'));
app.use(cors());
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/bins/', binsRouter)
app.use('/api/', endpointsRouter)

console.log(`connecting to ${config.MONGODB_URI}`);
(async () => {
  try {
    const response = await mongoose.connect(config.MONGODB_URI);
    console.log('connected to mongoDB');
  } catch (e) {
    console.log('error connecting to mongoDB');
  }
})();

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/public/index.html');
  res.sendFile(filePath)
});

app.get('/:bin_path', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/public/bin.html');
  res.sendFile(filePath)
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app;