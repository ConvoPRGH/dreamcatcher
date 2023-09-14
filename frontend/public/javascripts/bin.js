import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Events from '../src/classes/Events';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const paths = window.location.pathname.split('/');
    const binId = paths[paths.length - 1]
    const manager = new TemplateManager();

    const binHeader = document.querySelector('#bin-header');
    const binData = await DB.fetchOneBin(binId);
    binHeader.innerHTML = binData[0].name;

    const list = document.querySelector('#request-list');
    const requestBox = document.querySelector('#single-request');
    const requestData = await DB.fetchAllRequests(binId);
    const requests = mapToRequests(requestData);

    list.innerHTML = manager.templates.all_requests({request: requests});
    requestBox.innerHTML = manager.templates.one_request({request: requests[0]})

     // connect to backend WSS
    connectToWSS(binId);

    const events = new Events(DB);
    events.createBinPageEvents(requests, requestBox, manager);
  } catch (error) {
    console.log(error.messsage);
  }
});

const mapToRequests = (requests) => {
  return requests.map(request => new Request(request))
};

const connectToWSS = (binPath) => {
  const socket = new WebSocket(`ws://localhost:3005?binPath=${binPath}`);

  socket.onmessage = (event) => {
    const requestData = JSON.parse(event.data);
    // Render the new request
    console.log("Received Request:", requestData);
  }

  socket.onerror = (error) => {
    console.log(`WebSocket Error: ${error.message}`);
  }
}
