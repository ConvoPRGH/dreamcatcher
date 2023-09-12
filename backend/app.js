const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
// TODO
// const binssRouter = require('./controllers/bins.js')
// const requestsRouter = require('./controllers/requests.js')

const app = express();
app.use(cors());
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

console.log(`connecting to ${config.MONGODB_URI}`);

(async () => {
  try {
    const response = await mongoose.connect(config.MONGODB_URI);
    console.log('connected to mongoDB', response);
  } catch (e) {
    console.log('error connecting to mongoDB', e.message);
  }
})();

// console.log(`connecting to ${config.SQL_DB}`)

// app.use(express.static(''))


// app.use('/api/', router)



module.exports = app;