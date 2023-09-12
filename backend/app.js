const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const binsRouter = require('./controllers/bins.js')

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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app;