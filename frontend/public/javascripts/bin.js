import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Events from '../src/classes/Events';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const binId = window.location.pathname.slice(1);
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

    const events = new Events();
    events.createBinPageEvents(requests, requestBox, manager);
  } catch (error) {
    console.log(error.messsage);
  }
});

const mapToRequests = (requests) => {
  return requests.map(request => new Request(request))
};
