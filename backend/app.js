const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const WSServer = require('./wsserver.js');
const mongoose = require('mongoose');
const binsRouter = require('./controllers/bins.js')
const endpointsRouter = require('./controllers/endpoints.js')
const path = require('path');
const url = require('url');

const app = express();
// const wss = new WSServer(app);

expressWs(app);
const clients = new Set();
app.ws('/websocket', (ws, req) => {
  // Handle WebSocket connections here
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
  const query = url.parse(req.url, true).query;
  const binPath = query.binPath;

  // Store bin path of client
  ws.binPath = binPath;

  // Add the WebSocket client to the set
  clients.add(ws);
  // Handle client disconnection
  ws.on('close', () => {
    // Remove the WebSocket client from the set when they disconnect
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

app.use(express.static(path.join(__dirname, '../frontend/public'), { "extensions": ["js"] }));

app.use(cors());
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/bins/', binsRouter)
app.use('/api/', endpointsRouter(app.ws, clients))

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

app.get('/:bin_path/*', (req, res) => {
  const binPath = req.params.bin_path;
  res.redirect(302, `/${binPath}`);
});

app.get('/:bin_path', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/public/bin.html');
  res.sendFile(filePath)
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app;