import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const binId = window.location.pathname.slice(1);
    const manager = new TemplateManager();

    const binHeader = document.querySelector('#bin-header');
    const binData = await DB.fetchOneBin(binId);
    binHeader.innerHTML = binData[0].name;

    const list = document.querySelector('#request-list');
    const requestData = await DB.fetchAllRequests(binId);
    console.log(requestData)
    const requests = mapToRequests(requestData);
    console.log(requests)
    list.innerHTML = manager.templates.all_requests({request: requests});
  } catch (error) {
    console.log(error.messsage);
  }
});

const mapToRequests = (requests) => {
  return requests.map(request => new Request(request))
};