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
    console.log(requests);
     // connect to backend WSS
    connectToWSS(binId, requests, list, manager);

    const events = new Events(DB);
    events.createBinPageEvents(requests, requestBox, manager);
  } catch (error) {
    console.log(error.messsage);
    console.log(error);
  }
});

const mapToRequests = (requests) => {
  return requests.map(request => new Request(request)).reverse();
};

const connectToWSS = (binPath, requests, list, manager) => {
  const path = convertToCurrentRelativePath(window.location.href)
  console.log("Attempting to connect to WSS on:")
  console.log(`ws://${path}/websocket?binPath=${binPath}`)
  const socket = new WebSocket(`wss://${path}/websocket?binPath=${binPath}`);
  
  socket.onmessage = (event) => {
    const requestData = JSON.parse(event.data);
    // Render the new request
    requests.unshift(new Request(requestData));
    list.innerHTML = manager.templates.all_requests({request: requests});
  }

  socket.onerror = (error) => {
    console.log(`WebSocket Error: ${error.message}`);
  }
}

const convertToCurrentRelativePath = (href) => {
  let currentPath = href.split('/')
  currentPath = currentPath.slice(2, currentPath.length - 1)
  return currentPath.join('/');
}