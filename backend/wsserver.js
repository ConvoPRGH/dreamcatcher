const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

class WSServer {
  constructor(app) {
    this.bindHandlers();
    this.startWSS(app);
  }

  startWSS(app) {
    this.server = http.createServer(app);

    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Set();

    this.wss.on('connection', this.handleConnection);

    this.server.listen(3005, () => {
      console.log('Server is running on port 3005');
    });
  }
  
  handleConnection(ws, req) {
    const query = url.parse(req.url, true).query;
    const binPath = query.binPath;

    // Store bin path of client
    ws.binPath = binPath;
    this.clients.add(ws)

    ws.on('message', this.handleMessageReceivedFromClient);
  
    ws.on('close', () => {
      this.handleClientClose(ws);
    });
  }

  handleMessageReceivedFromClient(message) {
    console.log(`Received message: ${message}`);
  }

  handleClientClose(ws) {
    console.log("client disconnected");
    this.clients.delete(ws);
  }

  bindHandlers() {
    this.handleConnection = this.handleConnection.bind(this);
    this.handleMessageReceivedFromClient = this.handleMessageReceivedFromClient.bind(this);
    this.handleClientClose = this.handleClientClose.bind(this);
  }
}

module.exports = WSServer;