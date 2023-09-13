import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    // const url = new URL(window.location.href);
    const binId = window.location.pathname.slice(1);
    // console.log('path', pathname);
    const manager = new TemplateManager();
    console.log('template', manager);

    const binHeader = document.querySelector('#bin-header');
    const binData = await DB.fetchOneBin(binId);
    console.log('binData[0]',  binData[0]);
    binHeader.innerHTML=binData[0].name;
    

    // console.log('innerHTML', header.innerHTML);
    const list = document.querySelector('#request-list');

    const requestData = await DB.fetchAllRequests(binId);
    console.log('requestData', requestData);

    list.innerHTML = manager.templates.all_requests({request: requestData});
  } catch (error) {
    console.log(error.messsage);
  }

  //document.querySelector("#bin-list").addEventListener('click', handleBinClicked);
});